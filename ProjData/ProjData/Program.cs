using ProductApi.Repositories;
using ProjData.Models;
using ProjData.Services.Implementations;
using ProjData.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Dependency Injection (DI) for Repositories and Services
builder.Services.AddScoped<IRepository<Product>, ProductRepository>();
builder.Services.AddScoped<IRepository<Category>, CategoryRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

// Add CORS with specific origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Adjust this to your frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Exception Handling Middleware
app.UseExceptionHandler(appBuilder =>
{
    appBuilder.Run(async context =>
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync("An unexpected error occurred.");
    });
});

// Configure Swagger
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowSpecificOrigin");  // Apply the CORS policy

// Enable Authorization
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Run the app
app.Run();
