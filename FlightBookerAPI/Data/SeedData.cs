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
                    Id = 1,
                    Emri = "Super",
                    Mbiemri = "Admin",
                    Email = "superadmin@flightbooker.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    Role = "SuperAdmin",
                    Username = "superadmin",
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    Id = 2,
                    Emri = "Admin",
                    Mbiemri = "Flight",
                    Email = "admin@flightbooker.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                    Role = "Admin",
                    Username = "admin",
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
