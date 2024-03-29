using PokeIpsum;
using PokeIpsum.Server.Models;

public class GeracaoService
{
    private readonly HttpClient _http;
    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/generation/";

    public GeracaoService(HttpClient http)
    {
        _http = http;
    }

    public async Task<ListaGeracoesDTO> ObterListaGeracoes()
    {
        return await Commons.TratarRespostaAPI<ListaGeracoesDTO>(await _http.GetAsync(_pokeapiURL));

    }

    public async Task<GeracaoDTO> ObterPokemonsPorGeracao(int id)
    {
        return await Commons.TratarRespostaAPI<GeracaoDTO>(await _http.GetAsync($"{_pokeapiURL}{id}"));
    }

}
