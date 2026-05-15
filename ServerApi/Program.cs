using ServerApi.Repositories;
using ServerApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://127.0.0.1:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Server=(localdb)\\mssqllocaldb;Database=ECommerceDB;Trusted_Connection=True;TrustServerCertificate=True;";

builder.Services.AddSingleton(connectionString);
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<UserRepository>();

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowAngular");
app.MapControllers();

app.Run();

