using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public override string Email { get => base.Email; set => base.Email = value; }
        public override string UserName { get => base.UserName; set => base.UserName = value; }
        public string FullName { get => $"{FirstName} {LastName}"; }
    }
}
