// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

using PokeIpsum.Server.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient<PokeAPIController>();
builder.Services.AddHttpClient();
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.MapGet("/", () => "Poke-Ipsum está rodando...");

app.Run();
