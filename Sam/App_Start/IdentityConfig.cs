using System;
using System.Data.Entity;
using System.Text;
using System.Threading.Tasks;
using System.Web.Helpers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Sam.DbContext;

namespace Sam
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<User>
    {
        class Md5PasswordHasher : IPasswordHasher
        {
            static string GetMd5Hash(byte[] bytes)
            {
                if (bytes == null)
                    return "";
                var x = new System.Security.Cryptography.MD5CryptoServiceProvider();
                var bs = x.ComputeHash(bytes);
                var s = new StringBuilder();
                foreach (var b in bs)
                {
                    s.Append(b.ToString("x2").ToLower());
                }
                return s.ToString();
            }
            static string GetMd5Hash(string str)
            {
                return string.IsNullOrEmpty(str) ? "" : GetMd5Hash(Encoding.UTF8.GetBytes(str));
            }


            /// <summary>Hash a password</summary>
            /// <param name="password"></param>
            /// <returns></returns>
            public virtual string HashPassword(string password)
            {
                return GetMd5Hash(password);
            }

            /// <summary>Verify that a password matches the hashedPassword</summary>
            /// <param name="hashedPassword"></param>
            /// <param name="providedPassword"></param>
            /// <returns></returns>
            public virtual PasswordVerificationResult VerifyHashedPassword(string hashedPassword, string providedPassword)
            {
                return GetMd5Hash(providedPassword) == hashedPassword ? PasswordVerificationResult.Success : PasswordVerificationResult.Failed;
            }
        }


        public ApplicationUserManager(IUserStore<User> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new ApplicationUserStore(context.Get<ApplicationDbContext>()));

            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<User>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
//                RequiredLength = 6,
//                RequireNonLetterOrDigit = true,
//                RequireDigit = true,
//                RequireLowercase = true,
//                RequireUppercase = true,
            };
            manager.PasswordHasher = new Md5PasswordHasher();
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }

    public class ApplicationUserStore : UserStore<User>
    {
        public ApplicationUserStore(ApplicationDbContext dbContext) : base(dbContext)
        {
            
        }
        public override Task<User> FindByNameAsync(string userName)
        {
            return Context.Set<User>().Include("Employees").FirstOrDefaultAsync(x => x.UserName == userName);
        }
/*
        public override Task<User> FindByIdAsync(string id)
        {
            return Context.Set<User>().Include("Employees").FirstOrDefaultAsync(x => x.Id == id);
        }
*/
    }
}
