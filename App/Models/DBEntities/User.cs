using App.DataAccess;
using Microsoft.AspNet.Identity.EntityFramework;

namespace App.Models
{
    public class User : IdentityUser<int, CustomClasses.CustomUserLogin, CustomClasses.CustomUserRole, CustomClasses.CustomUserClaim>
    {

    }
}