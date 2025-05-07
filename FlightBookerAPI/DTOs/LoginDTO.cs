using System.ComponentModel.DataAnnotations;

namespace FlightBookerAPI.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Email është i detyrueshëm")]
        [EmailAddress(ErrorMessage = "Ju lutem shkruani një email të vlefshëm")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Password është i detyrueshëm")]
        public required string Password { get; set; }
    }
} 