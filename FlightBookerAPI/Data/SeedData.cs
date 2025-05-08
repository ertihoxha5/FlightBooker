using Microsoft.EntityFrameworkCore;
using FlightBookerAPI.Models;
using BCrypt.Net;

namespace FlightBookerAPI.Data
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserID = 1,
                    Emri = "Super",
                    Mbiemri = "Admin",
                    Verified = true,
                    CreatedAt = DateTime.UtcNow,
                    Login = new Login
                    {
                        Email = "superadmin@flightbooker.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                        Username = "superadmin",
                        Role = "SuperAdmin",
                        UserID = 1
                    }
                },
                new User
                {
                    UserID = 2,
                    Emri = "Admin",
                    Mbiemri = "Flight",
                    Verified = true,
                    CreatedAt = DateTime.UtcNow,
                    Login = new Login
                    {
                        Email = "admin@flightbooker.com",
                        Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                        Username = "admin",
                        Role = "Admin",
                        UserID = 2
                    }
                }
            );
        }
    }
}
