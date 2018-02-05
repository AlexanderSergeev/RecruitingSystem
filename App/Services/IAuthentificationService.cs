using App.Models;

namespace App.Services
{
    public interface IAuthentificationService
    {

        void SignIn(User user, string preferredRole);
        void SignOut();
    }
}