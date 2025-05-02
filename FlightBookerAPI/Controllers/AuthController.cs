using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FlightBookerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (request.Email == "admin@flightbooker.com" && request.Password == "password123")
            {
                var token = GenerateJwtToken(request.Email, "Admin");
                return Ok(new { Token = token });
            }
            else if (request.Email == "user@gmail.com" && request.Password == "12345678")
            {
                var token = GenerateJwtToken(request.Email, "User");
                return Ok(new { Token = token });
            }
            else
            {
                return Unauthorized("Kredencialet jane te pasakta.");
            }
        }
