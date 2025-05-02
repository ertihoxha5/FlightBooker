using System;

namespace FlightBookerAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;

        public string Emri { get; set; } = null!;
        public string Mbiemri { get; set; } = null!;
        public bool Verified { get; set; } = false;

        public string? Rruga { get; set; }
        public string? ZipCode { get; set; }
        public string? Qyteti { get; set; }
        public string? Gjinia { get; set; }

        public DateTime? DataLindjes { get; set; }
        public string? Shteti { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
