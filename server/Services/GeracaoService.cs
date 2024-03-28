using Microsoft.AspNetCore.Http.HttpResults;
using Newtonsoft.Json;
using PokeIpsum.Server.Models;

public class GeracaoService
{
    private readonly HttpClient _http;
    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/";

    public GeracaoService(HttpClient http)
    {
        _http = http;
    }

    public async Task<ListaGeracoesDTO> ObterListaGeracoes()
    {
        var endpointGeracoes = $"{_pokeapiURL}generation/";
        var resposta = await _http.GetAsync(endpointGeracoes);

        if (resposta.IsSuccessStatusCode)
        {
            var conteudo = await resposta.Content.ReadAsStringAsync();
            var listaGeracoes = JsonConvert.DeserializeObject<ListaGeracoesDTO>(conteudo);
            return listaGeracoes;
        }
        else
        {
            throw new Exception("Falha na requisição à API do Pokémon.");
        }
    }

    public async Task<GeracaoDTO> ObterPokemonsPorGeracao(int id)
    {
        var endpointGeracao = $"{_pokeapiURL}generation/{id}";
        var resposta = await _http.GetAsync(endpointGeracao);

        if (resposta.IsSuccessStatusCode)
        {
            var conteudo = await resposta.Content.ReadAsStringAsync();
            var pokemonsDaGeracao = JsonConvert.DeserializeObject<GeracaoDTO>(conteudo);
            return pokemonsDaGeracao ?? throw new ArgumentNullException(conteudo);
        }
        else
        {
            // Lançar uma exceção com base no status da resposta
            throw new HttpRequestException($"Falha na requisição à API do Pokémon. Status: {resposta.StatusCode}. Mensagem: {resposta.RequestMessage}");
        }
    }

}
