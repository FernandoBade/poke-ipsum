using System.Text;
using PokeIpsum.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace PokeIpsum.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GeradorController : ControllerBase
    {
        private readonly PokemonService? _pokemonService;
        private readonly GeracaoService? _geracaoService;
        private readonly TipoElementoService? _tipoElementoService;

        public GeradorController(PokemonService pokemonService, GeracaoService geracaoService, TipoElementoService tipoElementoService)
        {
            _pokemonService = pokemonService;
            _geracaoService = geracaoService;
            _tipoElementoService = tipoElementoService;
        }

        [HttpGet("pokeipsum")]
        public async Task<IActionResult> BuscarPokemonsPorFiltroDoUsuario(
            [FromQuery] string tiposElementos = "",
            [FromQuery] string geracoes = "",
            [FromQuery] int quantidade = 3,
            [FromQuery] string modo = "PARAGRAFO")
        {
            var excecoes = new HashSet<string> { "mr-mime", "mime-jr", "ho-oh", "porygon-z" };
            var filtradosPorTipo = new HashSet<string>();
            var filtradosPorGeracao = new HashSet<string>();

            if (!string.IsNullOrWhiteSpace(tiposElementos))
            {
                var tiposElementoList = tiposElementos.Split(',', StringSplitOptions.RemoveEmptyEntries);
                foreach (var tipoElemento in tiposElementoList)
                {
                    var pokemonsPorTipoElemento = await _tipoElementoService!.ObterListaPokemonsPorNomeDoTipoElemento(tipoElemento);
                    foreach (var te in pokemonsPorTipoElemento.PokemonsPorTipoElemento)
                    {
                        var nomePokemon = te.Pokemon?.Nome ?? "";
                        if (!excecoes.Contains(nomePokemon.ToLower()))
                        {
                            nomePokemon = nomePokemon.Split('-')[0];
                        }
                        filtradosPorTipo.Add(nomePokemon);
                    }
                }
            }

            if (!string.IsNullOrWhiteSpace(geracoes))
            {
                var geracoesList = geracoes.Split(',', StringSplitOptions.RemoveEmptyEntries);
                foreach (var geracao in geracoesList)
                {
                    var pokemonsPorGeracao = await _geracaoService!.ObterPokemonsPorNomeDaGeracao(geracao);
                    foreach (var g in pokemonsPorGeracao.PokemonsPorGeracao)
                    {
                        var nomePokemon = g.Nome;
                        if (!excecoes.Contains(nomePokemon.ToLower()))
                        {
                            nomePokemon = nomePokemon.Split('-')[0];
                        }
                        filtradosPorGeracao.Add(nomePokemon);
                    }
                }
            }

            var nomesPokemonsFiltrados = new HashSet<string>();

            if (filtradosPorTipo.Any() && filtradosPorGeracao.Any())
            {
                nomesPokemonsFiltrados = new HashSet<string>(filtradosPorTipo.Intersect(filtradosPorGeracao));
            }
            else
            {
                nomesPokemonsFiltrados.UnionWith(filtradosPorTipo);
                nomesPokemonsFiltrados.UnionWith(filtradosPorGeracao);
            }

            if (!filtradosPorTipo.Any() && !filtradosPorGeracao.Any())
            {
                var todosPokemons = await _pokemonService!.ObterTodosOsPokemons();
                foreach (var p in todosPokemons)
                {
                    var nomePokemon = p.Nome;
                    if (!excecoes.Contains(nomePokemon.ToLower()))
                    {
                        nomePokemon = nomePokemon.Split('-')[0];
                    }
                    nomesPokemonsFiltrados.Add(nomePokemon);
                }
            }

            if (!Enum.TryParse(modo, true, out Modo modoEnum))
            {
                return BadRequest("Modo inválido.");
            }

            var opcoes = new OpcoesDTO
            {
                NomesPokemons = nomesPokemonsFiltrados.ToList(),
                Quantidade = quantidade,
                Modo = modoEnum
            };

            var resultado = GerarPokeIpsum(opcoes);
            return Ok(resultado);
        }

        static List<string> GerarPokeIpsum(OpcoesDTO opcoes)
        {
            var resultados = new List<string>();
            var cultureInfo = CultureInfo.CurrentCulture.TextInfo;
            Random random = new();

            switch (opcoes.Modo)
            {
                case Modo.PALAVRA:
                    var palavras = Enumerable.Range(0, opcoes.Quantidade)
                        .Select(o => opcoes.NomesPokemons[random.Next(opcoes.NomesPokemons.Count)])
                        .Select(nome => cultureInfo.ToTitleCase(nome.ToLower()))
                        .ToList();

                    resultados.AddRange(palavras);
                    break;

                case Modo.FRASE:
                    foreach (var _ in Enumerable.Range(0, opcoes.Quantidade))
                    {
                        int palavrasPorFrase = random.Next(5, 9);
                        var palavrasFrase = Enumerable.Range(0, palavrasPorFrase)
                            .Select(o => opcoes.NomesPokemons[random.Next(opcoes.NomesPokemons.Count)])
                            .ToList();

                        palavrasFrase[0] = cultureInfo.ToTitleCase(palavrasFrase[0].ToLower());
                        var fraseCompleta = string.Join(" ", palavrasFrase) + ".";
                        resultados.Add(fraseCompleta);
                    }
                    break;

                case Modo.PARAGRAFO:
                    foreach (var _ in Enumerable.Range(0, opcoes.Quantidade))
                    {
                        int frasesPorParagrafo = random.Next(3, 6);
                        var frasesParagrafo = new List<string>();

                        foreach (var __ in Enumerable.Range(0, frasesPorParagrafo))
                        {
                            int palavrasPorFrase = random.Next(5, 9);
                            var palavrasFrase = Enumerable.Range(0, palavrasPorFrase)
                                .Select(o => opcoes.NomesPokemons[random.Next(opcoes.NomesPokemons.Count)])
                                .ToList();

                            palavrasFrase[0] = cultureInfo.ToTitleCase(palavrasFrase[0].ToLower());
                            var fraseCompleta = string.Join(" ", palavrasFrase) + ".";
                            frasesParagrafo.Add(fraseCompleta);
                        }

                        var paragrafoCompleto = string.Join(" ", frasesParagrafo);
                        resultados.Add(paragrafoCompleto);
                    }
                    break;

                default:
                    throw new ArgumentException("Modo inválido.");
            }

            return resultados;
        }
    }
}