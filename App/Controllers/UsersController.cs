using System;
using System.Security.Claims;
using System.Threading.Tasks;
using App.DataAccess;
using App.Models;
using System.Web.Http;
using App.Services;

namespace App.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        private IUserRepository repository;

        private readonly IAuthentificationService _authenticationService;

        public UsersController(IUserRepository repoInstance, IAuthentificationService authenticationService)
        {
            if (repoInstance == null || authenticationService == null)
            {
                throw new Exception("Repository is null!");
            }
            _authenticationService = authenticationService;
            repository = repoInstance;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<User> Login([FromBody]LoginModel model)
        {
            var user = await repository.FindByEmailAndPasswordAsync(model);

            var userRole = await repository.GetUserRole(user);

            _authenticationService.SignOut();
            _authenticationService.SignIn(user, userRole.Name);

            return user;
        }

        [HttpGet]
        [Route("role")]
        [Authorize]
        public string GetAccountInfo()
        {
            var role = ((ClaimsIdentity)RequestContext.Principal.Identity).FindFirst(ClaimsIdentity.DefaultRoleClaimType).Value;
            return role;
        }
    }
}