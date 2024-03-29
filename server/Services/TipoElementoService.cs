using PokeIpsum;
using PokeIpsum.Server.Models;

public class TipoElementoService
{
    private readonly HttpClient _http;
    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/type/";

    public TipoElementoService(HttpClient http)
    {
        _http = http;
    }

    public async Task<ListaTiposElementosDTO> ObterListaTiposElementos()
    {
        return await Commons.TratarRespostaAPI<ListaTiposElementosDTO>(await _http.GetAsync(_pokeapiURL));
    }

    public async Task<TipoElementoDTO> ObterListaPokemonsPorTipoElemento(int id)
    {
        return await Commons.TratarRespostaAPI<TipoElementoDTO>(await _http.GetAsync($"{_pokeapiURL}{id}"));
    }
}
