using PokeIpsum;
using PokeIpsum.Server.Models;
using Microsoft.Extensions.Caching.Memory;
using System.Globalization;

public class TipoElementoService
{
    private readonly HttpClient _http;
    private IMemoryCache _cache;

    private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/type/";

    public TipoElementoService(HttpClient http, IMemoryCache cache)
    {
        _http = http;
        _cache = cache;
    }

    public async Task<ListaTiposElementosDTO> ObterListaTiposElementos()
    {
        return await Commons.TratarRespostaAPI<ListaTiposElementosDTO>(await _http.GetAsync(_pokeapiURL));
    }

    public async Task<TipoElementoDTO> ObterListaPokemonsPorIdDoTipoElemento(int id)
    {
        return await Commons.TratarRespostaAPI<TipoElementoDTO>(await _http.GetAsync($"{_pokeapiURL}{id}"));
    }

    public async Task<TipoElementoDTO> ObterListaPokemonsPorNomeDoTipoElemento(string nome)
    {
        return await Commons.TratarRespostaAPI<TipoElementoDTO>(await _http.GetAsync($"{_pokeapiURL}{nome}"));
    }

    public async Task<Dictionary<string, List<PokemonDTO>>> ObterTodosPokemonsAgrupadosPorTipoElemento()
    {
        var listaTiposElementos = await ObterListaTiposElementos();
        var pokemonAgrupadosPorTipoElemento = new Dictionary<string, List<PokemonDTO>>();

        foreach (var tipoElemento in listaTiposElementos.TiposElementos)
        {
            var chaveCache = $"todos-pokemons-por-tipo-elemento_{tipoElemento.Nome}_{DateTime.Now.ToString("MMMM", new CultureInfo("pt-BR"))}-{DateTime.Now.Year}";
            if (!_cache.TryGetValue(chaveCache, out List<PokemonTipoElemento>? pokemonsTipoElemento))
            {
                var tipoElementoDTO = await ObterListaPokemonsPorNomeDoTipoElemento(tipoElemento.Nome);
                pokemonsTipoElemento = tipoElementoDTO.PokemonsPorTipoElemento;
                _cache.Set(chaveCache, pokemonsTipoElemento);
            }

            var pokemonsPorTipoElemento = pokemonsTipoElemento?.Select(pokemonTipo => new PokemonDTO { Nome = pokemonTipo.Pokemon?.Nome! }).ToList();

            if (pokemonsPorTipoElemento != null)
            {
                pokemonAgrupadosPorTipoElemento.Add(tipoElemento.Nome, pokemonsPorTipoElemento);
            }
        }

        return pokemonAgrupadosPorTipoElemento;
    }
}
