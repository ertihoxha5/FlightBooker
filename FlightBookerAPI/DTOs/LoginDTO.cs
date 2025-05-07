using System.ComponentModel.DataAnnotations;

namespace FlightBookerAPI.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Username është i detyrueshëm")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Password është i detyrueshëm")]
        public required string Password { get; set; }
    }
} 