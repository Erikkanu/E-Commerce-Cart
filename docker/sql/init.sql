IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ECommerceDB')
BEGIN
    CREATE DATABASE ECommerceDB;
END
GO

USE ECommerceDB;
GO

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        Id          INT IDENTITY(1,1) PRIMARY KEY,
        Username    NVARCHAR(100)  NOT NULL UNIQUE,
        Email       NVARCHAR(100)  NOT NULL UNIQUE,
        Password    NVARCHAR(255)  NOT NULL,
        CreatedAt   DATETIME       NOT NULL DEFAULT GETUTCDATE(),
        FirstName   NVARCHAR(100)  NULL,
        LastName    NVARCHAR(100)  NULL
    );
END
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
    ('Wireless Headphones', 'Premium noise-cancelling over-ear headphones', 79.99, 'https://i5.walmartimages.com/seo/Sennheiser-Momentum-4-Wireless-Headphones-Bluetooth-Headset-Crystal-Clear-Calls-Adaptive-Noise-Cancellation-60h-Battery-Life-Customizable-Sound-Black_105c13b6-bfb9-494c-9765-1afa40a46765.9374ca06f77e05393548402736e65a4f.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF'),
    ('Mechanical Keyboard', 'RGB backlit mechanical keyboard', 49.99, 'https://s13emagst.akamaized.net/products/98438/98437321/images/res_850b0d9e590031a519125e8afdfaf357.jpg?width=720&height=720&hash=64848FC650B6638CCF72A1DBA0DACA5F'),
    ('USB-C Hub', '7-in-1 USB-C hub with HDMI, USB 3.0', 34.99, 'https://s13emagst.akamaized.net/products/86868/86867266/images/res_0b35d35046b9188d4e91da8ceed04fe7.jpg'),
    ('Webcam 1080p', 'Full HD webcam with built-in microphone', 59.99, 'https://m.media-amazon.com/images/I/61dAkngibfL.jpg'),
    ('Mouse Pad XL', 'Extra large gaming mouse pad with non-slip base', 19.99, 'https://www.pcstudio.in/wp-content/uploads/2025/01/Ant-Esports-Sneakerz-Unique-Gaming-Mouse-Pad-1-1-600x600.webp'),
    ('Smartwatch', 'Fitness tracking smartwatch with heart rate monitor', 129.99, 'https://www.mytrendyphone.eu/images/C60-1-1-inch-Waterproof-Smart-Watch-Heart-Rate-Blood-Oxygen-Monitor-Body-Temperature-Detection-Fitness-Tracker-Sports-Smart-Wristband-PinkNone-22112023-00-p.webp'),
    ('Bluetooth Speaker', 'Portable Bluetooth speaker with deep bass', 39.99, 'https://s13emagst.akamaized.net/products/88988/88987527/images/res_5cd9c3cb7472f938ee7e34c6aeb5fc6f.jpg?width=720&height=720&hash=08D6D612265041FEA3B370477A7BE34A'),
    ('NVIDIA GeForce RTX 3060', 'High-performance graphics card for gaming and creative work', 329.99, 'https://s13emagst.akamaized.net/products/35204/35203661/images/res_2893d28e17a2d96fce9983c7daed3707.jpg');
END
GO
