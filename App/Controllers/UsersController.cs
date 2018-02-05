﻿using System;
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
        public Task<User> Login([FromBody]LoginModel model)
        {

            var user = repository.FindByEmailAndPasswordAsync(model);

            var userRole = repository.GetUserRole(user.Result);

            _authenticationService.SignOut();
            _authenticationService.SignIn(user.Result, userRole.Result.Name);

            return user;
        }
    }
}