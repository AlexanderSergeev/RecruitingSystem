using System.Data.Entity;
using App.DataAccess;
using App.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace App.Services
{
    public class ApplicationUserManager : UserManager<User, int>
    {
        public ApplicationUserManager(IUserStore<User, int> store) : base(store)
        {
        }

        public static ApplicationUserManager Create(
            IdentityFactoryOptions<ApplicationUserManager> options,
            IOwinContext context)
        {
            var dbContext = context.Get<AppDbContext>();
            var manager = new ApplicationUserManager(new CustomUserStore(dbContext));

            manager.UserValidator = new UserValidator<User, int>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 4,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
                RequireNonLetterOrDigit = true
            };

            return manager;
        }
    }

    public class CustomUserStore : UserStore<User, Role, int, CustomClasses.CustomUserLogin, CustomClasses.CustomUserRole, CustomClasses.CustomUserClaim>
    {
        public CustomUserStore(DbContext context) : base(context)
        {
        }
    }
}