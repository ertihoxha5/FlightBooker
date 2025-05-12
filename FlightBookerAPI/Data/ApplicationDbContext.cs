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
        public DbSet<Login> Logins { get; set; }
        public DbSet<Messages> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<SuperAdmini> SuperAdmins { get; set; }
        public DbSet<Telefoni> Telefonat { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Klienti> Klientet { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships and constraints
            modelBuilder.Entity<User>()
                .HasOne(u => u.Login)
                .WithOne(l => l.User)
                .HasForeignKey<Login>(l => l.UserID);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Admin)
                .WithOne(a => a.User)
                .HasForeignKey<Admin>(a => a.UserID);

            modelBuilder.Entity<User>()
                .HasOne(u => u.SuperAdmini)
                .WithOne(sa => sa.User)
                .HasForeignKey<SuperAdmini>(sa => sa.UserID);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Klienti)
                .WithOne(k => k.User)
                .HasForeignKey<Klienti>(k => k.UserID);

            // Configure cascade delete behavior
            modelBuilder.Entity<User>()
                .HasMany(u => u.Emails)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Telefonat)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Feedbacks)
                .WithOne(f => f.User)
                .HasForeignKey(f => f.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Messages)
                .WithOne(m => m.User)
                .HasForeignKey(m => m.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Notifications)
                .WithOne(n => n.User)
                .HasForeignKey(n => n.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Bookings)
                .WithOne(b => b.User)
                .HasForeignKey(b => b.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Payments)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // Konfigurime për Email
            modelBuilder.Entity<Email>()
                .HasKey(e => new { e.UserID, e.EmailAddress });

            // Konfigurime për Telefoni
            modelBuilder.Entity<Telefoni>()
                .HasKey(t => new { t.UserID, t.PhoneNumber });

            // Konfigurime për Login
            modelBuilder.Entity<Login>()
                .HasIndex(l => l.Username)
                .IsUnique();

            // Konfigurime për Admin
            modelBuilder.Entity<Admin>()
                .HasOne(a => a.User)
                .WithOne(u => u.Admin)
                .HasForeignKey<Admin>(a => a.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // Konfigurime për SuperAdmini
            modelBuilder.Entity<SuperAdmini>()
                .HasOne(s => s.User)
                .WithOne(u => u.SuperAdmini)
                .HasForeignKey<SuperAdmini>(s => s.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // Konfigurime për Klienti
            modelBuilder.Entity<Klienti>()
                .HasOne(k => k.User)
                .WithOne(u => u.Klienti)
                .HasForeignKey<Klienti>(k => k.UserID)
                .OnDelete(DeleteBehavior.Cascade);

            // Shto të dhënat fillestare
            SeedData.Seed(modelBuilder);
        }
    }
}
