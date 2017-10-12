using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PropertyApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PropertyApi.Controllers
{
    [Route("api/[controller]")]
    public class PropertiesController : AuthorizedController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public PropertiesController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // GET api/properties
        [HttpGet]
        public List<Property> GetAll()
        {
            return Property.GetAll(UserId);
        }

        // GET api/properties/2
        [HttpGet("{id}")]
        public Property Get(int id)
        {
            return Property.GetById(id, UserId);
        }

        // POST api/properties/add
        [HttpPost("{add}")]
        public dynamic Post([FromBody]Property property)
        {
            property.Landlord = UserId;
            return Property.AddItem(property, UserId);
        }
    }
}
