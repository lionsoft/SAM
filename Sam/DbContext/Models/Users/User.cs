using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using Sam.Extensions;
using T4TS;

namespace Sam.DbContext
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class User : IdentityUser, IEntityObjectId<string>
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
/*
            userIdentity.SetClaimValue("FIO", FIO);
            userIdentity.SetClaimValue("Email", Email);
*/
            userIdentity.SetClaimValue("Role", ((int)(Employee != null ? Employee.UserRole : UserRole.Undefined)).ToString());

            return userIdentity;
        }

        public User() : base()
        {
          this.Id = null;
        }

        public User(string userName) : base(userName)
        {
          this.Id = Guid.NewGuid().ToString();
        }

        [NotMapped]
        public Employee Employee
        {
            get { return Employees != null ? Employees.FirstOrDefault() : null; }
        }

        [NotMapped]
        public string Name
        {
            get { return Employee != null ? Employee.Name : UserName; }
        }

        [JsonIgnore]
        [InverseProperty("User")]
        public ICollection<Employee> Employees { get; set; }
    }
}