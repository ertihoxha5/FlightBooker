using Microsoft.EntityFrameworkCore;
using FlightBookerAPI.Models;

namespace FlightBookerAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Konfigurime shtesë për modelet mund të shtohen këtu
            SeedData.Seed(modelBuilder);
        }
    }
}
