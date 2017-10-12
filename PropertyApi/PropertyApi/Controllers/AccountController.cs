using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PropertyApi.Models;
using Microsoft.AspNetCore.Identity;
using PropertyApi.Models.Account;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Dapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PropertyApi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly Jwt _jwt;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            Jwt jwt)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwt = jwt;
        }

        // POST api/account/register
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]Register creds)
        {
            var user = new ApplicationUser { UserName = creds.Email, Email = creds.Email };
            var result = await _userManager.CreateAsync(user, creds.Password);
            var userClaims = await _userManager.GetClaimsAsync(user);

            if (result.Succeeded)
            {
                var token = _jwt.Create(user.Id);

                return Ok(new { user = user.Email, token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            return BadRequest("Could not create token.");
        }

        // POST api/account/login
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]Login login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);

            if (user != null)
            {
                var result = await _signInManager.PasswordSignInAsync(user.Email, login.Password, false, false);
                if (result.Succeeded)
                {
                    var token = _jwt.Create(user.Id);

                    return Ok(new { user = user.Email, token = new JwtSecurityTokenHandler().WriteToken(token) });
                }
            }
            return Unauthorized();
        }
    }
}
