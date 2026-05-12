using ServerApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

// 1. Setup CORS so Angular can talk to this API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 2. Database Connection String (We inject this into the repository)
// NOTE: Make sure your MS SQL database is actually named "ECommerceDB"
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Server=(localdb)\\mssqllocaldb;Database=ECommerceDB;Trusted_Connection=True;TrustServerCertificate=True;";

builder.Services.AddSingleton(connectionString);
builder.Services.AddScoped<ProductRepository>();

var app = builder.Build();

app.UseCors("AllowAngular");

// 3. The Minimal API Endpoint
app.MapGet("/api/products", async (ProductRepository repo) =>
{
    var products = await repo.GetAllProductsAsync();
    return Results.Ok(products);
});

app.Run();