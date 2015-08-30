using System;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Interception;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Sam.Models;

#pragma warning disable 4014

namespace Sam.DbContext
{
    partial class ApplicationDbContext
    {
        /// <summary>
        /// Актуальная версия базы данных.
        /// Если <see cref="ActualDbVersion"/> больше <see cref="CurrentDbVersion"/> вызывается метод <see cref="UpgradeDatabase"/>
        /// </summary>
        public const int ActualDbVersion = 1;

        private static ApplicationUserManager _userManager;

        protected void UpgradeDatabase(int fromVersion, int toVersion)
        {
            _userManager = _userManager ?? new ApplicationUserManager(new UserStore<User>());

            // Creating database from scratch
            if (fromVersion == 0)
            {
                Users.Add(new User
                {
                    UserName = "1",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    PasswordHash = _userManager.PasswordHasher.HashPassword("1")
                });


                Customers.Add(new Customer { Name = "Customer 1" });
                Customers.Add(new Customer { Name = "Customer 2" });

                Companies.Add(new Company { Name = "Company 1", Address1 = "Address 1 of Company 1", Address2 = "Address 2 of Company 1", ZipCode = "111111", Customer = Customers.Local[0] });
                Companies.Add(new Company { Name = "Company 2", Address1 = "Address 1 of Company 2", Address2 = "Address 2 of Company 2", ZipCode = "222222", Customer = Customers.Local[0] });
                Companies.Add(new Company { Name = "Company 3", Address1 = "Address 1 of Company 3", Address2 = "Address 2 of Company 3", ZipCode = "333333", Customer = Customers.Local[1] });

                Departments.Add(new Department { Name = "Department 1 of Company 1", Company = Companies.Local[0] });
                Departments.Add(new Department { Name = "Department 2 of Company 1", Company = Companies.Local[0] });
                Departments.Add(new Department { Name = "Department 1 of Company 2", Company = Companies.Local[1] });
                Departments.Add(new Department { Name = "Department 1 of Company 3", Company = Companies.Local[2] });
            }
            // Updating database to version 2
            else if (toVersion == 2)
            {
            }
        }

    }
}
