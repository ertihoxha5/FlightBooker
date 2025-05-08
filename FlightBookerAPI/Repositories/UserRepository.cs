using FlightBookerAPI.Data;
using FlightBookerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FlightBookerAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User? GetUserByEmail(string email)
        {
            return _context.Users
                .Include(u => u.Login)
                .FirstOrDefault(u => u.Login != null && u.Login.Email == email);
        }
    }
}
