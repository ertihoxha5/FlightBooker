using Microsoft.Data.SqlClient;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 1. Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// 2. Add Authorization
builder.Services.AddAuthorization();

// 3. Enhanced Swagger with JWT support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "FlightBooker API",
        Version = "v1",
        Description = "API for managing flight bookings with JWT authentication"
    });

    // Add JWT Auth to Swagger UI
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var app = builder.Build();

// Configure middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.EnableTryItOutByDefault();
        c.ConfigObject.AdditionalItems["oauth2RedirectUrl"] = "/swagger/oauth2-redirect.html";
    });
}

app.UseHttpsRedirection();
app.UseAuthentication(); // Enable authentication
app.UseAuthorization();  // Enable authorization

// 4. Add Authentication Endpoint
app.MapPost("/login", (LoginRequest request) =>
{
    // In a real app, validate credentials against database
    if (request.Username == "admin" && request.Password == "admin123")
    {
        var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = builder.Configuration["Jwt:Issuer"],
            Audience = builder.Configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return Results.Ok(new { Token = tokenHandler.WriteToken(token) });
    }
    return Results.Unauthorized();
}).AllowAnonymous();

// 5. Protected Endpoints
app.MapGet("/test", TestConnection)
    .RequireAuthorization();

app.MapGet("/users", GetUsers)
    .RequireAuthorization();

app.Run();

// Handler methods
async Task<string> TestConnection()
{
    await using var connection = new SqlConnection(connectionString);
    await connection.OpenAsync();
    var command = new SqlCommand("SELECT @@VERSION", connection);
    return (await command.ExecuteScalarAsync()).ToString();
}

async Task<List<User>> GetUsers()
{
    var users = new List<User>();
    await using var connection = new SqlConnection(connectionString);
    await connection.OpenAsync();

    var command = new SqlCommand("SELECT UserID, Emri, Mbiemri FROM [User]", connection);
    using var reader = await command.ExecuteReaderAsync();

    while (await reader.ReadAsync())
    {
        users.Add(new User(
            reader.GetInt32(0),
            reader.GetString(1),
            reader.GetString(2)
        ));
    }
    return users;
}

// DTOs
public record User(int Id, string FirstName, string LastName);
public record LoginRequest(string Username, string Password);

// Extension for Swagger UI
public static class SwaggerUIOptionsExtensions
{
    public static void EnableTryItOutByDefault(this SwaggerUIOptions options)
    {
        options.ConfigObject.AdditionalItems["tryItOutEnabled"] = true;
    }
}