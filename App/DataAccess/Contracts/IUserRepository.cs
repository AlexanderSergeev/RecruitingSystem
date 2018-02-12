using System.Threading.Tasks;
using App.Models;

namespace App.DataAccess
{
    public interface IUserRepository
    {
        Task<User> FindByEmailAndPasswordAsync(LoginModel model);

        Task<Role> GetUserRole(User user);
    }
}
