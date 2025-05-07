using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.ComponentModel.DataAnnotations;
using FlightBookerAPI.DTOs;
using FlightBookerAPI.Models;
using FlightBookerAPI.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace FlightBookerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthController(IConfiguration configuration, ApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kontrollo nëse email-i ekziston
            if (await _context.Emails.AnyAsync(e => e.EmailAddress == registerDto.Email))
            {
                return BadRequest("Ky email është i regjistruar tashmë");
            }

            // Kontrollo nëse username ekziston
            if (await _context.Logins.AnyAsync(l => l.Username == registerDto.Username))
            {
                return BadRequest("Ky username është i zënë");
            }

            // Krijo përdoruesin
            var user = new User
            {
                Emri = registerDto.Emri,
                Mbiemri = registerDto.Mbiemri,
                Rruga = registerDto.Rruga,
                ZipCode = registerDto.ZipCode,
                Qyteti = registerDto.Qyteti,
                Gjinia = registerDto.Gjinia,
                DataLindjes = registerDto.DataLindjes,
                Shteti = registerDto.Shteti,
                Verified = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Krijo email-in
            var email = new Email
            {
                UserID = user.UserID,
                EmailAddress = registerDto.Email,
                IsPrimary = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Emails.Add(email);

            // Krijo login-in
            var login = new Login
            {
                UserID = user.UserID,
                Username = registerDto.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                CreatedAt = DateTime.UtcNow
            };

            _context.Logins.Add(login);

            // Krijo klientin
            var klienti = new Klienti
            {
                UserID = user.UserID
            };

            _context.Klientet.Add(klienti);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Regjistrimi u krye me sukses" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var email = await _context.Emails
                .Include(e => e.User)
                .ThenInclude(u => u.Login)
                .FirstOrDefaultAsync(e => e.EmailAddress == loginDto.Email);

            if (email == null || email.User == null || email.User.Login == null)
            {
                return Unauthorized("Email ose password i gabuar");
            }

            var login = email.User.Login;

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, login.Password))
            {
                return Unauthorized("Email ose password i gabuar");
            }

            var user = email.User;

            // Përcakto rolin e përdoruesit
            string role = "User";
            if (await _context.SuperAdminet.AnyAsync(s => s.UserID == user.UserID))
            {
                role = "SuperAdmin";
            }
            else if (await _context.Admins.AnyAsync(a => a.UserID == user.UserID))
            {
                role = "Admin";
            }

            var token = GenerateJwtToken(login.Username, role);

            return Ok(new
            {
                token,
                username = login.Username,
                email = email.EmailAddress,
                role = role
            });
        }

        private string GenerateJwtToken(string username, string role)
        {
            var jwtKey = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key nuk eshte konfiguruar");
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, role)
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginRequest
    {
        [Required]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
