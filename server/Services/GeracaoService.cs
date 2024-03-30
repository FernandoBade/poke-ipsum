using PokeIpsum;
using PokeIpsum.Server.Models;
using Microsoft.Extensions.Caching.Memory;
using System.Globalization;

public class GeracaoService
{
    private readonly HttpClient _http;
    private IMemoryCache _cache;
    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/generation/";

    public GeracaoService(HttpClient http, IMemoryCache cache)
    {
        _http = http;
        _cache = cache;
    }

    public async Task<ListaGeracoesDTO> ObterListaGeracoes()
    {
        return await Commons.TratarRespostaAPI<ListaGeracoesDTO>(await _http.GetAsync(_pokeapiURL));

    }

    public async Task<GeracaoDTO> ObterPokemonsPorIdDaGeracao(int id)
    {
        return await Commons.TratarRespostaAPI<GeracaoDTO>(await _http.GetAsync($"{_pokeapiURL}{id}"));
    }

    public async Task<GeracaoDTO> ObterPokemonsPorNomeDaGeracao(string nome)
    {
        return await Commons.TratarRespostaAPI<GeracaoDTO>(await _http.GetAsync($"{_pokeapiURL}{nome}"));
    }

    public async Task<Dictionary<string, List<PokemonDTO>>> ObterTodosPokemonsAgrupadosPorGeracoes()
    {
        var listaGeracoes = await ObterListaGeracoes();
        var pokemonsAgrupadosPorGeracao = new Dictionary<string, List<PokemonDTO>>();

        foreach (var geracao in listaGeracoes.Geracoes)
        {
            var chaveCache = $"todos-pokemons-da-geracao_{geracao.Nome}_{DateTime.Now.ToString("MMMM", new CultureInfo("pt-BR"))}-{DateTime.Now.Year}";

            if (!_cache.TryGetValue(chaveCache, out List<PokemonDTO>? pokemonsPorGeracao))
            {
                var geracaoDTO = await ObterPokemonsPorNomeDaGeracao(geracao.Nome);
                pokemonsPorGeracao = geracaoDTO.PokemonsPorGeracao;

                _cache.Set(chaveCache, pokemonsPorGeracao);
            }

            if (pokemonsPorGeracao != null)
            {
                pokemonsAgrupadosPorGeracao.Add(geracao.Nome, pokemonsPorGeracao);
            }
        }

        return pokemonsAgrupadosPorGeracao;
    }
}
