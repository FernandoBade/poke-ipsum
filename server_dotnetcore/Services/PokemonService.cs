using PokeIpsum;
using PokeIpsum.Server.Models;
using Microsoft.Extensions.Caching.Memory;
using System.Globalization;

public class PokemonService
{
    private readonly HttpClient _http;
    private readonly IMemoryCache _cache;

    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/pokemon/";

    public PokemonService(HttpClient http, IMemoryCache cache)
    {
        _http = http;
        _cache = cache;
    }

    public async Task<PokemonDTO> ObterPokemonPorId(int id)

    {
        return await Commons.TratarRespostaAPI<PokemonDTO>(await _http.GetAsync($"{_pokeapiURL}{id}"));
    }

    public async Task<PokemonDTO> ObterPokemonPorNome(string nome)
    {
        return await Commons.TratarRespostaAPI<PokemonDTO>(await _http.GetAsync($"{_pokeapiURL}{nome}"));
    }

    public async Task<List<PokemonDTO>> ObterTodosOsPokemons()
    {
        var chaveCache = $"todos-os-pokemons_{DateTime.Now.ToString("MMMM", new CultureInfo("pt-BR"))}-{DateTime.Now.Year}";

        if (!_cache.TryGetValue(chaveCache, out List<PokemonDTO>? pokemons))
        {

            var listaPokemonsDTO = await Commons.TratarRespostaAPI<ListaPokemonDTO>(await _http.GetAsync($"{_pokeapiURL}?limit=99999"));
            pokemons = listaPokemonsDTO.Results;

            _cache.Set(chaveCache, pokemons);
        }
        return pokemons ?? [];
    }
}