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

        [HttpGet("filtro")]
        public async Task<IActionResult> AplicarFiltrosDoUsuario(
            [FromQuery] string tiposElemento = "",
            [FromQuery] string geracoes = "",
            [FromQuery] int quantidade = 3,
            [FromQuery] string modo = "PARAGRAFOS")
        {
            var nomesPokemonsFiltrados = new List<string>();
            var excecoes = new List<string> { "mr-mime", "mime-jr", "ho-oh", "porygon-z" };
            var tiposElementoList = tiposElemento.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList();
            var geracoesList = geracoes.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList();

            // Filtrando por tipo de elemento
            if (tiposElementoList.Any())
            {
                foreach (var tipoElemento in tiposElementoList)
                {
                    var pokemonsPorTipoElemento = await _tipoElementoService!.ObterListaPokemonsPorNomeDoTipoElemento(tipoElemento);
                    nomesPokemonsFiltrados.AddRange(pokemonsPorTipoElemento.PokemonsPorTipoElemento.Select(te =>
                    {
                        var nomePokemon = te.Pokemon?.Nome ?? "";
                        return excecoes.Contains(nomePokemon.ToLower()) ? nomePokemon : nomePokemon.Split('-')[0];
                    }));
                }
            }

            // Filtrando por geração
            if (geracoesList.Any())
            {
                foreach (var geracao in geracoesList)
                {
                    var pokemonsPorGeracao = await _geracaoService!.ObterPokemonsPorNomeDaGeracao(geracao);
                    var nomesPorGeracao = pokemonsPorGeracao.PokemonsPorGeracao.Select(g =>
                    {
                        var nomePokemon = g.Nome;
                        return excecoes.Contains(nomePokemon.ToLower()) ? nomePokemon : nomePokemon.Split('-')[0];
                    });

                    // Interseção com tipos, se houver
                    if (nomesPokemonsFiltrados.Any())
                    {
                        nomesPokemonsFiltrados = nomesPokemonsFiltrados.Intersect(nomesPorGeracao).ToList();
                    }
                    else
                    {
                        nomesPokemonsFiltrados.AddRange(nomesPorGeracao);
                    }
                }
            }

            // Se nenhum filtro for aplicado, buscar todos os Pokémon
            if (!tiposElementoList.Any() && !geracoesList.Any())
            {
                nomesPokemonsFiltrados = (await _pokemonService!.ObterTodosOsPokemons()).Select(p =>
                {
                    var nomePokemon = p.Nome;
                    return excecoes.Contains(nomePokemon.ToLower()) ? nomePokemon : nomePokemon.Split('-')[0];
                }).ToList();
            }

            // Verificando e ajustando a opção 'Modo'
            if (!Enum.TryParse(modo, true, out Modo modoEnum))
            {
                return BadRequest("Modo inválido.");
            }

            var opcoes = new OpcoesDTO
            {
                NomesPokemons = nomesPokemonsFiltrados.Distinct().ToList(),
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