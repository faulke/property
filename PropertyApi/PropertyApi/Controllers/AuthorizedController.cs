using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using PropertyApi.Filters;

namespace PropertyApi.Controllers
{
    [AutoRefreshToken, Authorize(AuthenticationSchemes = "Bearer")]
    public class AuthorizedController : Controller
    {
        protected string UserId => User.Identity.Name;
    }
}
