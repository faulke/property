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
    [Route("v1/[controller]/[action]")]
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

        // POST v1/account/register
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]Register creds)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new ApplicationUser { FirstName = creds.FirstName, LastName = creds.LastName, UserName = creds.Email, Email = creds.Email };
            var result = await _userManager.CreateAsync(user, creds.Password);

            if (result.Succeeded)
            {
                var token = _jwt.Create(user.Id);

                return Ok(new { user = user.FullName, token = new JwtSecurityTokenHandler().WriteToken(token) });
            }

            if (result.Errors.Any())
                return BadRequest(new { errors = result.Errors });

            return BadRequest();
        }

        // POST v1/account/login
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]Login login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);

            if (user == null)
                return BadRequest(new { error = "User does not exist with that email." });

            else
            {
                var result = await _signInManager.PasswordSignInAsync(user.Email, login.Password, false, false);
                if (result.Succeeded)
                {
                    var token = _jwt.Create(user.Id);

                    return Ok(new { user = user.FullName, token = new JwtSecurityTokenHandler().WriteToken(token) });
                }
                return Unauthorized();
            }
            
        }
    }
}
