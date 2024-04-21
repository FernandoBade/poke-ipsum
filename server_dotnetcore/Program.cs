// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

using PokeIpsum.Server.Controllers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddHttpClient<PokeIpsumController>();
builder.Services.AddHttpClient<GeradorController>();
builder.Services.AddHttpClient<PokemonService>();
builder.Services.AddHttpClient<GeracaoService>();
builder.Services.AddHttpClient<TipoElementoService>();
builder.Services.AddMemoryCache();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});


builder.Services.AddControllers();


var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => "Poké Ipsum is online!");

app.Run();
