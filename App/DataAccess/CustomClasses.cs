using Microsoft.AspNet.Identity.EntityFramework;

namespace App.DataAccess
{
    public class CustomClasses
    {
        public class CustomUserLogin : IdentityUserLogin<int>
        {
        }

        public class CustomUserRole : IdentityUserRole<int>
        {
        }

        public class CustomUserClaim : IdentityUserClaim<int>
        {
        }
    }
}