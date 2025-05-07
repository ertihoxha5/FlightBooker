using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlightBookerAPI.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserID { get; set; }

        [Required]
        [StringLength(100)]
        public required string Emri { get; set; }

        [Required]
        [StringLength(100)]
        public required string Mbiemri { get; set; }

        [Required]
        public bool Verified { get; set; } = false;

        [StringLength(200)]
        public string? Rruga { get; set; }

        [StringLength(20)]
        public string? ZipCode { get; set; }

        [StringLength(100)]
        public string? Qyteti { get; set; }

        [StringLength(10)]
        public string? Gjinia { get; set; }

        public DateTime? DataLindjes { get; set; }

        [StringLength(100)]
        public string? Shteti { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Email> Emails { get; set; } = new List<Email>();
        public virtual ICollection<Telefoni> Telefonat { get; set; } = new List<Telefoni>();
        public virtual Login? Login { get; set; }
        public virtual Admin? Admin { get; set; }
        public virtual SuperAdmini? SuperAdmini { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
        public virtual ICollection<Messages> Messages { get; set; } = new List<Messages>();
        public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
        public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
        public virtual Klienti? Klienti { get; set; }
    }
}
