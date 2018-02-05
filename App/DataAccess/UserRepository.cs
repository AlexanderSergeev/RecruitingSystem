using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using App.Models;
using PasswordHasher = App.Services.PasswordHasher;

namespace App.DataAccess
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext contextInstance)
        {
            if (contextInstance == null)
            {
                throw new Exception("Context is null!");
            }
            _context = contextInstance;
        }

        public async Task<User> FindByEmailAndPasswordAsync(LoginModel model)
        {
            var user = await _context
                .Users
                .FirstOrDefaultAsync(u => u.UserName.ToUpper() == model.Email.ToUpper());

            return PasswordHasher.VerifyHashedPassword(user.PasswordHash, model.Password) ? user : null;
        }


        public async Task<Role> GetUserRole(User user)
        {
            var role = user.Roles.FirstOrDefault();

            return await _context.Roles.FirstOrDefaultAsync(r => role.RoleId == r.Id);
        }
    }
}