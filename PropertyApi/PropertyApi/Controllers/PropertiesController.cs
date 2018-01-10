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
using PropertyApi.Models.Property;
using PropertyApi.Options;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PropertyApi.Controllers
{
    [Route("v1/[controller]")]
    public class PropertiesController : AuthorizedController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly CloudParams _cloudOpts;

        public PropertiesController(UserManager<ApplicationUser> userManager, IOptions<CloudParams> cloudOpts)
        {
            _userManager = userManager;
            _cloudOpts = cloudOpts.Value;
        }

        // GET v1/properties
        [HttpGet]
        public List<PropertyListItemModel> GetAll()
        {
            return PropertyModel.GetAll(UserId);
        }

        // GET v1/properties/:id
        [HttpGet("{id}")]
        public PropertyModel Get(int id)
        {
            return PropertyModel.GetById(id, UserId);
        }

        // POST v1/properties/add
        [HttpPost("{add}")]
        public dynamic Post([FromBody]PropertyModel property)
        {
            property.Landlord = UserId;
            return PropertyModel.AddItem(property, UserId, _cloudOpts.StorageBucket);
        }
    }
}
