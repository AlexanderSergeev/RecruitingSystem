using System.Security.Claims;
using System.Web;
using App.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace App.Services
{
    public class AuthentificationService : IAuthentificationService
    {
        public void SignIn(User user, string preferredRole)
        {
            var owinContext = HttpContext.Current.GetOwinContext();

            var userManager = owinContext.GetUserManager<ApplicationUserManager>();
            var identity = userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);

            var roleClaims = identity.FindAll(x => x.Type == ClaimsIdentity.DefaultRoleClaimType);
            foreach (var roleClaim in roleClaims)
                identity.RemoveClaim(roleClaim);

            identity.AddClaim(new Claim(ClaimsIdentity.DefaultRoleClaimType, preferredRole, ClaimValueTypes.String));

            owinContext.Authentication.SignIn(identity);
        }

        public void SignOut()
        {
            HttpContext.Current
                .GetOwinContext()
                .Authentication
                .SignOut(DefaultAuthenticationTypes.ApplicationCookie);
        }
    }
}