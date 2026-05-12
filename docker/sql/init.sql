IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ECommerceDB')
BEGIN
    CREATE DATABASE ECommerceDB;
END
GO

USE ECommerceDB;
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Products' AND xtype='U')
BEGIN
    CREATE TABLE Products (
        Id          INT IDENTITY(1,1) PRIMARY KEY,
        Name        NVARCHAR(200)  NOT NULL,
        Description NVARCHAR(1000) NULL,
        Price       DECIMAL(18,2)  NOT NULL,
        ImageUrl    NVARCHAR(500)  NULL
    );

    INSERT INTO Products (Name, Description, Price, ImageUrl) VALUES
    ('Wireless Headphones', 'Premium noise-cancelling over-ear headphones', 79.99, 'https://placehold.co/300x200?text=Headphones'),
    ('Mechanical Keyboard', 'RGB backlit mechanical keyboard with blue switches', 49.99, 'https://placehold.co/300x200?text=Keyboard'),
    ('USB-C Hub', '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader', 34.99, 'https://placehold.co/300x200?text=USB+Hub'),
    ('Webcam 1080p', 'Full HD webcam with built-in microphone', 59.99, 'https://placehold.co/300x200?text=Webcam'),
    ('Mouse Pad XL', 'Extra large gaming mouse pad with non-slip base', 19.99, 'https://placehold.co/300x200?text=Mouse+Pad');
END
GO
