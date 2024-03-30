using PokeIpsum.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace PokeIpsum.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GeradorController : ControllerBase
    {
        private readonly PokemonService _pokemonService;
        private readonly GeracaoService _geracaoService;
        private readonly TipoElementoService _tipoElementoService;

        public GeradorController(PokemonService pokemonService, GeracaoService geracaoService, TipoElementoService tipoElementoService)
        {
            _pokemonService = pokemonService;
            _geracaoService = geracaoService;
            _tipoElementoService = tipoElementoService;
        }

        [HttpGet("filtro")]
        public async Task<IActionResult> AplicarFiltrosDoUsuario(
            string? tipoElemento,
            string? geracao,
            int quantidade = 3,
            string modo = "PARAGRAFOS",
            bool iniciarComPokeIpsumDolor = false)
        {
            List<string> nomesPokemonsFiltrados = [];

            if (string.IsNullOrWhiteSpace(tipoElemento) && string.IsNullOrWhiteSpace(geracao))
            {
                nomesPokemonsFiltrados = (await _pokemonService.ObterTodosOsPokemons()).Select(p => p.Nome.Split('-')[0]).ToList();
            }
            else
            {
                if (!string.IsNullOrWhiteSpace(tipoElemento))
                {
                    var pokemonsPorTipo = await _tipoElementoService.ObterListaPokemonsPorNomeDoTipoElemento(tipoElemento);
                    nomesPokemonsFiltrados.AddRange(pokemonsPorTipo.PokemonsPorTipoElemento.Select(te => te.Pokemon?.Nome.Split('-')[0] ?? ""));
                }

                if (!string.IsNullOrWhiteSpace(geracao))
                {
                    var pokemonsPorGeracao = await _geracaoService.ObterPokemonsPorNomeDaGeracao(geracao);
                    var nomesPokemonsGeracaoFiltrados = pokemonsPorGeracao.PokemonsPorGeracao.Select(g => g.Nome.Split('-')[0] ?? "");

                    if (nomesPokemonsFiltrados.Count != 0)
                    {
                        nomesPokemonsFiltrados = nomesPokemonsFiltrados.Intersect(nomesPokemonsGeracaoFiltrados).ToList();
                    }
                    else
                    {
                        nomesPokemonsFiltrados.AddRange(nomesPokemonsGeracaoFiltrados);
                    }
                }
            }

            var pokemonsFiltrados = nomesPokemonsFiltrados.Select(nome => new PokemonDTO { Nome = nome });

            if (!Enum.TryParse(modo, true, out Modo modoEnum))
            {
                return BadRequest("Modo inválido.");
            }

            var opcoes = new OpcoesDTO
            {
                NomesPokemons = nomesPokemonsFiltrados.Distinct().ToList(),
                Quantidade = quantidade,
                Modo = modoEnum,
                IniciarComPokeIpsumDolor = iniciarComPokeIpsumDolor
            };

            return Ok(opcoes);
        }
    }
}
