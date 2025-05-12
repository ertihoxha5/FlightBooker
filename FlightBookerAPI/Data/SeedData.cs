using Microsoft.EntityFrameworkCore;
using FlightBookerAPI.Models;
using BCrypt.Net;

namespace FlightBookerAPI.Data
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            // Krijo përdoruesit
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserID = 1,
                    Emri = "Super",
                    Mbiemri = "Admin",
                    Verified = true,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    UserID = 2,
                    Emri = "Admin",
                    Mbiemri = "Flight",
                    Verified = true,
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Krijo email-et
            modelBuilder.Entity<Email>().HasData(
                new Email
                {
                    UserID = 1,
                    EmailAddress = "superadmin@flightbooker.com",
                    IsPrimary = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Email
                {
                    UserID = 2,
                    EmailAddress = "admin@flightbooker.com",
                    IsPrimary = true,
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Krijo login-et
            modelBuilder.Entity<Login>().HasData(
                new Login
                {
                    LoginID = 1,
                    UserID = 1,
                    Username = "superadmin",
                    Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                    Email = "superadmin@flightbooker.com",
                    Role = "SuperAdmin",
                    CreatedAt = DateTime.UtcNow
                },
                new Login
                {
                    LoginID = 2,
                    UserID = 2,
                    Username = "admin",
                    Password = BCrypt.Net.BCrypt.HashPassword("password123"),
                    Email = "admin@flightbooker.com",
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Krijo super adminin
            modelBuilder.Entity<SuperAdmini>().HasData(
                new SuperAdmini
                {
                    SuperAdminiID = 1,
                    UserID = 1,
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Krijo adminin
            modelBuilder.Entity<Admin>().HasData(
                new Admin
                {
                    AdminID = 1,
                    UserID = 2,
                    Departamenti = "IT",
                    Niveli_i_Aksesit = 2,
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
}
