using FlightBookerAPI.Models;

namespace FlightBookerAPI.Repositories
{
    public interface IUserRepository
    {
        User? GetUserByEmail(string email);
    }
}
