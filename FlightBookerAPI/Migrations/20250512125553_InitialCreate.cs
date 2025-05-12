using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FlightBookerAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Login",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Login",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Admin",
                keyColumn: "AdminID",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 12, 12, 55, 52, 781, DateTimeKind.Utc).AddTicks(3780));

            migrationBuilder.UpdateData(
                table: "Email",
                keyColumns: new[] { "EmailAddress", "UserID" },
                keyValues: new object[] { "superadmin@flightbooker.com", 1 },
                column: "CreatedAt",
                value: new DateTime(2025, 5, 12, 12, 55, 52, 529, DateTimeKind.Utc).AddTicks(5463));

            migrationBuilder.UpdateData(
                table: "Email",
                keyColumns: new[] { "EmailAddress", "UserID" },
                keyValues: new object[] { "admin@flightbooker.com", 2 },
                column: "CreatedAt",
                value: new DateTime(2025, 5, 12, 12, 55, 52, 529, DateTimeKind.Utc).AddTicks(5465));

            migrationBuilder.UpdateData(
                table: "Login",
                keyColumn: "LoginID",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Email", "Password", "Role" },
                values: new object[] { new DateTime(2025, 5, 12, 12, 55, 52, 653, DateTimeKind.Utc).AddTicks(1907), "superadmin@flightbooker.com", "$2a$11$uxf4tqFIyt0liEByhWJ0PO.BGJL3f48NL9YvFKaiqykvvLt4RgECG", "SuperAdmin" });

            migrationBuilder.UpdateData(
                table: "Login",
                keyColumn: "LoginID",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Email", "Password", "Role" },
                values: new object[] { new DateTime(2025, 5, 12, 12, 55, 52, 781, DateTimeKind.Utc).AddTicks(1962), "admin@flightbooker.com", "$2a$11$l.M1HnwR/fRBn996IeVpl.W2ze.mV.nxc2U0osGv3bJjnOP4Dog.m", "Admin" });

            migrationBuilder.UpdateData(
                table: "SuperAdmini",
                keyColumn: "SuperAdminiID",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 12, 12, 55, 52, 781, DateTimeKind.Utc).AddTicks(3703));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserID",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 12, 12, 55, 52, 529, DateTimeKind.Utc).AddTicks(5311));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserID",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 12, 12, 55, 52, 529, DateTimeKind.Utc).AddTicks(5315));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Login");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Login");

            migrationBuilder.UpdateData(
                table: "Admin",
                keyColumn: "AdminID",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 7, 11, 40, 8, 680, DateTimeKind.Utc).AddTicks(717));

            migrationBuilder.UpdateData(
                table: "Email",
                keyColumns: new[] { "EmailAddress", "UserID" },
                keyValues: new object[] { "superadmin@flightbooker.com", 1 },
                column: "CreatedAt",
                value: new DateTime(2025, 5, 7, 11, 40, 8, 446, DateTimeKind.Utc).AddTicks(2348));

            migrationBuilder.UpdateData(
                table: "Email",
                keyColumns: new[] { "EmailAddress", "UserID" },
                keyValues: new object[] { "admin@flightbooker.com", 2 },
                column: "CreatedAt",
                value: new DateTime(2025, 5, 7, 11, 40, 8, 446, DateTimeKind.Utc).AddTicks(2353));

            migrationBuilder.UpdateData(
                table: "Login",
                keyColumn: "LoginID",
                keyValue: 1,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 5, 7, 11, 40, 8, 561, DateTimeKind.Utc).AddTicks(1705), "$2a$11$n4v/Xx0vEX9fRWdG9Fq87.yOXGK51hVL/ahoFt6oTn4vi.3i9vUWi" });

            migrationBuilder.UpdateData(
                table: "Login",
                keyColumn: "LoginID",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Password" },
                values: new object[] { new DateTime(2025, 5, 7, 11, 40, 8, 679, DateTimeKind.Utc).AddTicks(9825), "$2a$11$iLftch3XkHJxMLhp6SXyrOsuiBzxPxL8cVqnxDP4pao7cYAbW50Re" });

            migrationBuilder.UpdateData(
                table: "SuperAdmini",
                keyColumn: "SuperAdminiID",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 7, 11, 40, 8, 680, DateTimeKind.Utc).AddTicks(637));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserID",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 7, 11, 40, 8, 446, DateTimeKind.Utc).AddTicks(2097));

            migrationBuilder.UpdateData(
                table: "User",
                keyColumn: "UserID",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 5, 7, 11, 40, 8, 446, DateTimeKind.Utc).AddTicks(2102));
        }
    }
}
