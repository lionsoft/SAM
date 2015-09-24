using System;
using System.Linq;
using Microsoft.AspNet.Identity.EntityFramework;
using Sam.DbContext.Hooks;
using Sam.Extensions;

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
                SequentialIdProvider.Create(Card.NumberSeq);
                FillWithCurrentUserHook.DefaultUserId = SequentialGuid.NewGuid().ToString();
                Users.Add(new User
                {
                    Id = FillWithCurrentUserHook.DefaultUserId,
                    UserName = "1",
                    Email = "user0@mail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    PasswordHash = _userManager.PasswordHasher.HashPassword("1")
                });

                for (var i = 1; i < 10; i++)
                {
                    Users.Add(new User
                    {
                        Id = SequentialGuid.NewGuid().ToString(),
                        UserName = "user" + i,
                        Email = "user" + i + "@mail.com",
                        SecurityStamp = Guid.NewGuid().ToString(),
                        PasswordHash = _userManager.PasswordHasher.HashPassword("1")
                    });
                }


                Customers.Add(new Customer { Name = "Customer 1" });
                Customers.Add(new Customer { Name = "Customer 2" });

                Companies.Add(new Company { Name = "Company 1", Address1 = "Address 1 of Company 1", Address2 = "Address 2 of Company 1", ZipCode = "111111", Customer = Customers.Local[0] });
                Companies.Add(new Company { Name = "Company 2", Address1 = "Address 1 of Company 2", Address2 = "Address 2 of Company 2", ZipCode = "222222", Customer = Customers.Local[0] });
                Companies.Add(new Company { Name = "Company 3", Address1 = "Address 1 of Company 3", Address2 = "Address 2 of Company 3", ZipCode = "333333", Customer = Customers.Local[1] });

                Departments.Add(new Department { Name = "Department 1 of Company 1", Company = Companies.Local[0] });
                Departments.Add(new Department { Name = "Department 2 of Company 1", Company = Companies.Local[0] });
                Departments.Add(new Department { Name = "Department 1 of Company 2", Company = Companies.Local[1] });
                Departments.Add(new Department { Name = "Department 1 of Company 3", Company = Companies.Local[2] });
                Departments.Add(new Department { Name = "Department 2 of Company 3", Company = Companies.Local[2] });

                Employees.Add(new Employee
                {
                    Name = "Lars Larsen",
                    Email = "lars@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.Admin,
                    Department = null,
                    Manager = null,
                    User = Users.Local[0]
                });

                Employees.Add(new Employee
                {
                    Name = "Bilding Owner Number One",
                    Email = "bo1@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.BuildingOwner,
                    Department = Departments.Local[0],
                    Manager = null,
                    User = Users.Local[1]
                });
                Employees.Add(new Employee
                {
                    Name = "Bilding Owner Number Two",
                    Email = "bo2@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.BuildingOwner,
                    Department = Departments.Local[1],
                    Manager = null,
                    User = Users.Local[2]
                });
                Employees.Add(new Employee
                {
                    Name = "Area Owner Number One",
                    Email = "ao1@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.AreaOwner,
                    Department = Departments.Local[2],
                    Manager = null,
                    User = Users.Local[3]
                });
                Employees.Add(new Employee
                {
                    Name = "Area Owner Number Two",
                    Email = "ao2@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.AreaOwner,
                    Department = Departments.Local[3],
                    Manager = null,
                    User = Users.Local[4]
                });
                Employees.Add(new Employee
                {
                    Name = "Door Owner Number One",
                    Email = "do1@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.DoorOwner,
                    Department = Departments.Local[2],
                    Manager = null,
                    User = Users.Local[5]
                });
                Employees.Add(new Employee
                {
                    Name = "Door Owner Number Two",
                    Email = "do2@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.DoorOwner,
                    Department = Departments.Local[3],
                    Manager = null,
                    User = Users.Local[5]
                });
                Employees.Add(new Employee
                {
                    Name = "Manager Number One",
                    Email = "mgr@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.Manager,
                    Department = Departments.Local[3],
                    Manager = null,
                    User = Users.Local[6]
                });
                Employees.Add(new Employee
                {
                    Name = "Manager Number Two",
                    Email = "mgr2@larsen.com",
                    PinCode = null,
                    Status = EmployeeStatus.Resigned,
                    Image = null,
                    UserRole = UserRole.Manager,
                    Department = Departments.Local[4],
                    Manager = null,
                    User = Users.Local[7]
                });
                Employees.Add(new Employee
                {
                    Name = "John Dow",
                    Email = "john@larsen.com",
                    PinCode = 1234,
                    Status = EmployeeStatus.Normal,
                    Image = null,
                    UserRole = UserRole.Normal,
                    Department = Departments.Local[0],
                    Manager = Employees.Local.FirstOrDefault(m => m.UserRole == UserRole.Manager),
                    User = Users.Local[8]
                });
                Employees.Add(new Employee
                {
                    Name = "Jack Daniels",
                    Email = "jack@daniels.com",
                    PinCode = 2341,
                    Status = EmployeeStatus.New,
                    Image = null,
                    UserRole = UserRole.Normal,
                    Department = Departments.Local[0],
                    Manager = Employees.Local.Where(m => m.UserRole == UserRole.Manager).Skip(1).FirstOrDefault(),
                    User = Users.Local[9]
                });

                Countries.Add(new Country { Name = "Denmark" });
                Countries.Add(new Country { Name = "Ukraine" });
                
                Cities.Add(new City { Name = "Oslo", Country = Countries.Local[0], ZipCode = "12345" });
                Cities.Add(new City { Name = "Kiev", Country = Countries.Local[1], ZipCode = "60000" });
                Cities.Add(new City { Name = "Zaporozhye", Country = Countries.Local[1], ZipCode = "69000" });

                Buildings.Add(new Building { Name = "Big Ben", Address1 = "Somewhere in Oslo", City = Cities.Local[0], Customer = Customers.Local[0], Owner = Employees.Local.FirstOrDefault(m => m.UserRole == UserRole.BuildingOwner) });
                Buildings.Add(new Building { Name = "Plaza", Address1 = "Somewhere in Oslo", City = Cities.Local[0], Customer = Customers.Local[1], Owner = Employees.Local.Where(m => m.UserRole == UserRole.BuildingOwner).Skip(1).FirstOrDefault() });

                Areas.Add(new Area { Name = "Area 60", Building = Buildings.Local[0], Owner = Employees.Local.FirstOrDefault(m => m.UserRole == UserRole.AreaOwner) });
                Areas.Add(new Area { Name = "Area 61", Building = Buildings.Local[0], Owner = Employees.Local.Where(m => m.UserRole == UserRole.AreaOwner).Skip(1).FirstOrDefault() });
                Areas.Add(new Area { Name = "Area 90", Building = Buildings.Local[0], Owner = Employees.Local.FirstOrDefault(m => m.UserRole == UserRole.AreaOwner) });
            }
            // Updating database to version 2
            else if (toVersion == 2)
            {
            }
        }

    }
}
