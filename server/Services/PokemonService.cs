using PokeIpsum;
using PokeIpsum.Server.Models;

public class PokemonService
{
    private readonly HttpClient _http;
    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/pokemon/";

    public PokemonService(HttpClient http)
    {
        _http = http;
    }

    public async Task<PokemonDTO> ObterPokemonPorId(int id)
    {
        return await Commons.TratarRespostaAPI<PokemonDTO>(await _http.GetAsync($"{_pokeapiURL}{id}"));
    }
}
