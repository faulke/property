using Dapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PropertyApi.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PropertyApi.Models
{
    public class Jwt
    {
        private readonly TokenParams _tokenOpts;

        public Jwt(IOptions<TokenParams> tokenOpts)
        {
            _tokenOpts = tokenOpts.Value;
        }

        private Jwt() { }

        public string Jti { get; set; }
        public bool IsRevoked { get; set; }

        public JwtSecurityToken Create(string userId, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenOpts.Key));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _tokenOpts.Issuer,
                _tokenOpts.Audience,
                claims,
                expires: DateTime.Now.Add(_tokenOpts.Refresh),
                signingCredentials: credentials
            );

            var jti = token.Id;

            var conn = DataConnection.GetConnection();
            using (conn)
            {
                var sql = @"
                    insert into jwt (
                        userId,
                        jti,
                        createdDate
                    ) values (
                        @userId,
                        @jti,
                        @createdDate
                    ) returning id;";

                var jtiId = conn.Query<Jwt>(sql, new { userId, jti, createdDate = DateTime.UtcNow }).FirstOrDefault();
            }

            return token;
        }

        public JwtSecurityToken ValidateToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenOpts.Key)),
                ValidateIssuer = true,
                ValidIssuer = _tokenOpts.Issuer,
                ValidateAudience = true,
                ValidAudience = _tokenOpts.Audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
            };

            var handler = new JwtSecurityTokenHandler();

            if (handler.CanReadToken(token))
            {
                handler.ValidateToken(token, tokenValidationParameters, out var validToken);
                var validJwt = validToken as JwtSecurityToken;
                return validJwt;
            }
            throw new SecurityTokenException("Security token is malformed.");

        }

        public Jwt GetLastJti(string userId)
        {
            var conn = DataConnection.GetConnection();
            using (conn)
            {
                // where isRevoked = 0
                var sql = "select * from jwt where userId = @userId order by createdDate desc limit 1";

                return conn.Query<Jwt>(sql, new { userId }).FirstOrDefault();
            }
        }

        public Jwt InsertJti(string userId, string jti)
        {
            var conn = DataConnection.GetConnection();
            using (conn)
            {
                var sql = @"
                    insert into jwt (
                        userId,
                        jti,
                        createdDate
                    ) values (
                        @userId,
                        @jti,
                        @createdDate
                    ) returning id;";

                return conn.Query<Jwt>(sql, new { userId, jti, createdDate = DateTime.Now }).FirstOrDefault();
            }
        }
    }
}
