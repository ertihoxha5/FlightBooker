using System.ComponentModel.DataAnnotations;

namespace FlightBookerAPI.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "Emri është i detyrueshëm")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Emri duhet të jetë midis 2 dhe 50 karaktereve")]
        public required string Emri { get; set; }

        [Required(ErrorMessage = "Mbiemri është i detyrueshëm")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Mbiemri duhet të jetë midis 2 dhe 50 karaktereve")]
        public required string Mbiemri { get; set; }

        [Required(ErrorMessage = "Email është i detyrueshëm")]
        [EmailAddress(ErrorMessage = "Ju lutem vendosni një email të vlefshëm")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "Username është i detyrueshëm")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "Username duhet të jetë midis 3 dhe 50 karaktereve")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Password është i detyrueshëm")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password duhet të jetë të paktën 6 karaktere")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$",
            ErrorMessage = "Password duhet të përmbajë të paktën një shkronjë të madhe, një të vogël, një numër dhe një karakter special")]
        public required string Password { get; set; }

        [Required(ErrorMessage = "Konfirmimi i password është i detyrueshëm")]
        [Compare("Password", ErrorMessage = "Password-të nuk përputhen")]
        public required string ConfirmPassword { get; set; }

        public string? Rruga { get; set; }
        public string? ZipCode { get; set; }
        public string? Qyteti { get; set; }
        public string? Gjinia { get; set; }
        public DateTime? DataLindjes { get; set; }
        public string? Shteti { get; set; }
    }
} 