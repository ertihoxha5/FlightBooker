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

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users
                .Include(u => u.Login)
                .FirstOrDefaultAsync(u => u.Login.Email == loginDto.Email);

            if (user == null || user.Login == null)
            {
                return Unauthorized("Email ose password i gabuar");
            }

            // Verifiko password-in
            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Login.Password))
            {
                return Unauthorized("Email ose password i gabuar");
            }

            var token = GenerateJwtToken(user.Login.Username, user.Login.Role);

            return Ok(new
            {
                token,
                username = user.Login.Username,
                email = user.Login.Email,
                role = user.Login.Role
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kontrollo nëse email-i ekziston
            if (await _context.Logins.AnyAsync(l => l.Email == registerDto.Email))
            {
                return BadRequest("Ky email është i regjistruar tashmë");
            }

            // Kontrollo nëse username ekziston
            if (await _context.Logins.AnyAsync(l => l.Username == registerDto.Username))
            {
                return BadRequest("Ky username është i zënë");
            }

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
                CreatedAt = DateTime.UtcNow,
                Login = new Login
                {
                    Username = registerDto.Username,
                    Email = registerDto.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                    Role = "User",
                    CreatedAt = DateTime.UtcNow
                }
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Regjistrimi u krye me sukses" });
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
