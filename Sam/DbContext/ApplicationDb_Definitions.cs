using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Annotations;
using System.Data.Entity.ModelConfiguration.Conventions;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Sam.DbContext
{
    /// <summary>
    /// Description of the application tables
    /// </summary>
    partial class ApplicationDbContext
    {
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Add<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Add<ManyToManyCascadeDeleteConvention>();

            // Устанавливаем размер строки по умолчанию 128 символов
            modelBuilder.Properties<string>().Configure(c => c.HasMaxLength(128));

            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("Logins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("Claims");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");

            modelBuilder.Entity<IdentityUser>().ToTable("Users");
            modelBuilder.Entity<User>().ToTable("Users");

            modelBuilder.Entity<User>().Property(u => u.Email).HasColumnAnnotation("Index", new IndexAnnotation(new IndexAttribute("IDX_UserEmail", 0) { IsUnique = true }));
         }


        public IDbSet<Employee> Employees { get; set; }

        public IDbSet<Customer> Customers { get; set; }

        public IDbSet<Company> Companies { get; set; }

        public IDbSet<Department> Departments { get; set; }

        public IDbSet<Country> Countries { get; set; }

        public IDbSet<City> Cities { get; set; }

        public IDbSet<Building> Buildings { get; set; }
        public IDbSet<Area> Areas { get; set; }
        public IDbSet<Door> Doors { get; set; }

        public IDbSet<Card> Cards { get; set; }

        public IDbSet<DoorList> DoorLists { get; set; }
        public IDbSet<DepartmentList> DepartmentLists { get; set; }

        public IDbSet<CardAccess> CardAccesses { get; set; }
    }
}