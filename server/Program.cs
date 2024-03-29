// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

using PokeIpsum.Server.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddHttpClient<PokeAPIController>();
builder.Services.AddHttpClient<PokemonService>(); // Registra o serviço e o HttpClient associado
builder.Services.AddHttpClient<GeracaoService>(); // Registra o serviço e o HttpClient associado
builder.Services.AddHttpClient<TipoElementoService>();
builder.Services.AddControllers();


var app = builder.Build();

app.MapControllers();

app.MapGet("/", () => "Poke-Ipsum está rodando...");

app.Run();
