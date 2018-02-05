using System.Data.Entity;
using App.DataAccess;
using App.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace App.Services
{
    public class ApplicationRoleManager : RoleManager<Role, int>
    {
        public ApplicationRoleManager(IRoleStore<Role, int> store) : base(store)
        {
        }

        public static ApplicationRoleManager Create(
            IdentityFactoryOptions<ApplicationRoleManager> options,
            IOwinContext context)
        {
            var dbContext = context.Get<AppDbContext>();
            return Create(dbContext);
        }

        public static ApplicationRoleManager Create(AppDbContext dbContext)
        {
            return new ApplicationRoleManager(new CustomRoleStore(dbContext));
        }
    }

    public class CustomRoleStore : RoleStore<Role, int, CustomClasses.CustomUserRole>
    {
        public CustomRoleStore(DbContext context) : base(context)
        {
        }
    }
}