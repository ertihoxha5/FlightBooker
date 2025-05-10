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

            try
            {
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

                return Ok(new { 
                    message = "Regjistrimi u krye me sukses",
                    userId = user.UserID,
                    email = email.EmailAddress,
                    username = login.Username
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Ndodhi një gabim gjatë regjistrimit: {ex.Message}");
            }
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

            if (email == null)
            {
                return Unauthorized("Email-i nuk ekziston në sistem");
            }

            if (email.User == null)
            {
                return Unauthorized("Përdoruesi nuk u gjet");
            }

            if (email.User.Login == null)
            {
                return Unauthorized("Kredencialet e login-it nuk u gjetën");
            }

            var login = email.User.Login;

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, login.Password))
            {
                return Unauthorized("Fjalëkalimi është i gabuar");
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
                expires: DateTime.Now.AddHours(3),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet("get-users")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _context.Users
                    .Include(u => u.Emails)
                    .Include(u => u.Login)
                    .Select(u => new
                    {
                        u.UserID,
                        u.Emri,
                        u.Mbiemri,
                        Email = u.Emails.Where(e => e.IsPrimary).Select(e => e.EmailAddress).FirstOrDefault(),
                        Username = u.Login.Username,
                        u.Verified,
                        u.CreatedAt
                    })
                    .ToListAsync();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest($"Ndodhi një gabim: {ex.Message}");
            }
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
