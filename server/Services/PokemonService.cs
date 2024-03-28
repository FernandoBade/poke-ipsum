using Newtonsoft.Json;
using PokeIpsum.Server.Models;

public class PokemonService
{
    private readonly HttpClient _http;
    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/";

    public PokemonService(HttpClient http)
    {
        _http = http;
    }

    public async Task<PokemonDTO> ObterPokemonPorId(int id)
    {
        var endpointPokemon = $"{_pokeapiURL}pokemon/{id}";
        var resposta = await _http.GetAsync(endpointPokemon);

        if (resposta.IsSuccessStatusCode)
        {
            var conteudo = await resposta.Content.ReadAsStringAsync();
            var pokemon = JsonConvert.DeserializeObject<PokemonDTO>(conteudo);
            if (pokemon != null)
            {
                return pokemon;
            }
        }
        else
        {
            throw new Exception("Falha na requisição à API do Pokémon.");
        }
    }
}
