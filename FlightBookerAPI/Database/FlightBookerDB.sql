-- Create Database
CREATE DATABASE FlightBookerDB;
GO

USE FlightBookerDB;
GO

-- Create Tables
CREATE TABLE [User] (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Emri NVARCHAR(100) NOT NULL,
    Mbiemri NVARCHAR(100) NOT NULL,
    Verified BIT NOT NULL DEFAULT 0,
    Rruga NVARCHAR(200) NULL,
    ZipCode NVARCHAR(20) NULL,
    Qyteti NVARCHAR(100) NULL,
    Gjinia NVARCHAR(10) NULL,
    DataLindjes DATETIME2 NULL,
    Shteti NVARCHAR(100) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NULL
);

CREATE TABLE [Email] (
    UserID INT NOT NULL,
    EmailAddress NVARCHAR(255) NOT NULL,
    IsPrimary BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT PK_Email PRIMARY KEY (UserID, EmailAddress),
    CONSTRAINT FK_Email_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Login] (
    LoginID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Role NVARCHAR(20) NOT NULL DEFAULT 'User',
    UserID INT NOT NULL UNIQUE,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Login_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Klienti] (
    KlientiID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL UNIQUE,
    CONSTRAINT FK_Klienti_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Admin] (
    AdminID INT IDENTITY(1,1) PRIMARY KEY,
    Departamenti NVARCHAR(100) NOT NULL,
    Niveli_i_Aksesit INT NOT NULL,
    UserID INT NOT NULL UNIQUE,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Admin_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [SuperAdmini] (
    SuperAdminiID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL UNIQUE,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_SuperAdmini_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Booking] (
    BookingID INT IDENTITY(1,1) PRIMARY KEY,
    BookingDate DATETIME2 NOT NULL,
    ExpirationDate DATETIME2 NULL,
    NumberOfTickets INT NOT NULL,
    TotalPrice DECIMAL(10,2) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NULL,
    UserID INT NOT NULL,
    CONSTRAINT FK_Booking_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Payment] (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    Amount DECIMAL(10,2) NOT NULL,
    PaymentMethod NVARCHAR(50) NULL,
    Status NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NULL,
    UserID INT NOT NULL,
    CONSTRAINT FK_Payment_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Feedback] (
    FeedbackID INT IDENTITY(1,1) PRIMARY KEY,
    Komenti NVARCHAR(MAX) NULL,
    Vleresimi TINYINT NULL,
    UserID INT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Feedback_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Messages] (
    MessageID INT IDENTITY(1,1) PRIMARY KEY,
    Subject NVARCHAR(200) NULL,
    Content NVARCHAR(MAX) NULL,
    SentAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UserID INT NOT NULL,
    CONSTRAINT FK_Messages_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Notification] (
    NotificationID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NULL,
    Message NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IsRead BIT NOT NULL DEFAULT 0,
    UserID INT NOT NULL,
    CONSTRAINT FK_Notification_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

CREATE TABLE [Telefoni] (
    UserID INT NOT NULL,
    PhoneNumber NVARCHAR(20) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT PK_Telefoni PRIMARY KEY (UserID, PhoneNumber),
    CONSTRAINT FK_Telefoni_User FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE
);

-- Insert Sample Data
-- Super Admin
INSERT INTO [User] (Emri, Mbiemri, Verified, CreatedAt)
VALUES ('Super', 'Admin', 1, GETUTCDATE());

INSERT INTO [Email] (UserID, EmailAddress, IsPrimary, CreatedAt)
VALUES (1, 'superadmin@flightbooker.com', 1, GETUTCDATE());

INSERT INTO [Login] (Username, Password, Email, Role, UserID, CreatedAt)
VALUES ('superadmin', '$2a$11$n4v/Xx0vEX9fRWdG9Fq87.yOXGK51hVL/ahoFt6oTn4vi.3i9vUWi', 'superadmin@flightbooker.com', 'SuperAdmin', 1, GETUTCDATE());

INSERT INTO [SuperAdmini] (UserID, CreatedAt)
VALUES (1, GETUTCDATE());

-- Admin
INSERT INTO [User] (Emri, Mbiemri, Verified, CreatedAt)
VALUES ('Admin', 'Flight', 1, GETUTCDATE());

INSERT INTO [Email] (UserID, EmailAddress, IsPrimary, CreatedAt)
VALUES (2, 'admin@flightbooker.com', 1, GETUTCDATE());

INSERT INTO [Login] (Username, Password, Email, Role, UserID, CreatedAt)
VALUES ('admin', '$2a$11$iLftch3XkHJxMLhp6SXyrOsuiBzxPxL8cVqnxDP4pao7cYAbW50Re', 'admin@flightbooker.com', 'Admin', 2, GETUTCDATE());

INSERT INTO [Admin] (Departamenti, Niveli_i_Aksesit, UserID, CreatedAt)
VALUES ('IT', 2, 2, GETUTCDATE());

-- Sample User
INSERT INTO [User] (Emri, Mbiemri, Verified, Rruga, ZipCode, Qyteti, Gjinia, DataLindjes, Shteti, CreatedAt)
VALUES ('Elira', 'Kola', 0, 'Rruga e Kavajës', '1010', 'Tiranë', 'F', '1998-03-22', 'Shqipëri', GETUTCDATE());

INSERT INTO [Email] (UserID, EmailAddress, IsPrimary, CreatedAt)
VALUES (3, 'elira.kola@example.com', 1, GETUTCDATE());

INSERT INTO [Login] (Username, Password, Email, Role, UserID, CreatedAt)
VALUES ('elirakola', '$2a$11$Elira@2024', 'elira.kola@example.com', 'User', 3, GETUTCDATE());

INSERT INTO [Klienti] (UserID)
VALUES (3);

-- Queries to check data
-- Check Users
SELECT * FROM [User];

-- Check Emails
SELECT * FROM [Email];

-- Check Logins
SELECT * FROM [Login];

-- Check User Roles
SELECT 
    u.UserID,
    u.Emri,
    u.Mbiemri,
    e.EmailAddress,
    l.Username,
    l.Role
FROM [User] u
JOIN [Email] e ON u.UserID = e.UserID
JOIN [Login] l ON u.UserID = l.UserID;

-- Check if a specific user exists
SELECT 
    u.UserID,
    u.Emri,
    u.Mbiemri,
    e.EmailAddress,
    l.Username,
    l.Role
FROM [User] u
JOIN [Email] e ON u.UserID = e.UserID
JOIN [Login] l ON u.UserID = l.UserID
WHERE e.EmailAddress = 'elira.kola@example.com'; 