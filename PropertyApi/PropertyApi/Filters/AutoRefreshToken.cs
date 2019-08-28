using Dapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PropertyApi.Models;
using PropertyApi.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace PropertyApi.Filters
{
    public class AutoRefreshTokenAttribute : TypeFilterAttribute
    {
        public AutoRefreshTokenAttribute() : base(typeof(AutoRefreshTokenImpl)) { }
        private class AutoRefreshTokenImpl : AuthorizeAttribute, IAuthorizationFilter
        {
            private readonly TokenParams _tokenOpts;
            private readonly Jwt _jwt;

            private readonly UserManager<ApplicationUser> _userManager;

            public AutoRefreshTokenImpl(IOptions<TokenParams> tokenOpts, Jwt jwt, UserManager<ApplicationUser> userManager)
            {
                _tokenOpts = tokenOpts.Value;
                _jwt = jwt;
                _userManager = userManager;
            }

            public void OnAuthorization(AuthorizationFilterContext context)
            {
                if (!context.HttpContext.Request.Headers.TryGetValue("Authorization", out var authHeader)) {
                    context.Result = new UnauthorizedResult();
                }

                if (!AuthenticationHeaderValue.TryParse(authHeader, out var authValue))
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }

                try
                {
                    // check if token is valid and not expired
                    var validJwt = _jwt.ValidateToken(authValue.Parameter);
                    var principal = new GenericPrincipal(new GenericIdentity(validJwt.Subject), null);
                    context.HttpContext.User = principal;
                }
 
                catch(SecurityTokenExpiredException)
                {

                    // token expired, get jti and check against last jti issued
                    var expiredToken = new JwtSecurityTokenHandler().ReadJwtToken(authValue.Parameter);
                    var jti = expiredToken.Id;
                    var roles = expiredToken.Claims
                      .Where(claim => claim.Type == ClaimsIdentity.DefaultRoleClaimType)
                      .Select(claim => claim.Value)
                      .ToList();
                    var userId = expiredToken.Subject;

                    var lastIssued = _jwt.GetLastJti(userId);

                    /* if jti from expired token is equal to last issued jti,
                     * and last issued jti has not been revoked
                     * issue new token and insert new jti  
                     */
                    if (jti != lastIssued.Jti || lastIssued.IsRevoked)
                    {
                        context.Result = new UnauthorizedResult();
                        return;
                    }
                    else
                    {
                        var token = _jwt.Create(userId, roles);

                        var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
                        context.HttpContext.Response.Headers.Add("Authorization", string.Format("Bearer {0}", encodedToken));

                        var principal = new GenericPrincipal(new GenericIdentity(userId), null);
                        context.HttpContext.User = principal;
                        return;
                    }
                }

                catch(SecurityTokenValidationException)
                {
                    context.Result = new UnauthorizedResult();
                }

                catch (SecurityTokenException)
                {
                    context.Result = new UnauthorizedResult();
                }

                return;
            }
        }
    }
}
