using Newtonsoft.Json;
using PokeIpsum.Server.Models;

public class TipoElementoService
{
    private readonly HttpClient _http;
    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/";

    public TipoElementoService(HttpClient http)
    {
        _http = http;
    }

    public async Task<ListaGeracoesDTO> ObterListaTiposElementos()
    {
        var endpointTipoElemento = $"{_pokeapiURL}type/";
        var resposta = await _http.GetAsync(endpointTipoElemento);

        if (resposta.IsSuccessStatusCode)
        {
            var conteudo = await resposta.Content.ReadAsStringAsync();
            var listaTipoElemento = JsonConvert.DeserializeObject<ListaGeracoesDTO>(conteudo);
            return listaTipoElemento;
        }
        else
        {
            throw new Exception("Falha na requisição à API do Pokémon.");
        }
    }

    public async Task<TipoElementoDTO> ObterListaPokemonsPorTipoElemento(int id)
    {
        var endpointTipoElemento = $"{_pokeapiURL}type/{id}";
        var resposta = await _http.GetAsync(endpointTipoElemento);

        if (resposta.IsSuccessStatusCode)
        {
            var conteudo = await resposta.Content.ReadAsStringAsync();
            var PokemonsPorTipoElemento = JsonConvert.DeserializeObject<TipoElementoDTO>(conteudo);
            return PokemonsPorTipoElemento;
        }
        else
        {
            throw new Exception("Falha na requisição à API do Pokémon.");
        }
    }
}
