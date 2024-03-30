using Microsoft.AspNetCore.Mvc;

namespace PokeIpsum.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PokeIpsumController : ControllerBase
    {
        private readonly PokemonService _pokemonService;
        private readonly GeracaoService _geracaoService;
        private readonly TipoElementoService _tipoElementoService;

        public PokeIpsumController(PokemonService pokemonService, GeracaoService geracaoService, TipoElementoService tipoElementoService)
        {
            _pokemonService = pokemonService;
            _geracaoService = geracaoService;
            _tipoElementoService = tipoElementoService;
        }

        [HttpGet("pokemon/{idOuNome?}")]
        public async Task<IActionResult> ObterPokemonPorIdOuNome(string? idOuNome)
        {
            try
            {
                if (string.IsNullOrEmpty(idOuNome))
                {
                    var pokemons = await _pokemonService.ObterTodosOsPokemons();
                    return Ok(pokemons);
                }
                else
                {
                    var pokemon = int.TryParse(idOuNome, out int id)
                        ? await _pokemonService.ObterPokemonPorId(id)
                        : await _pokemonService.ObterPokemonPorNome(idOuNome);
                    return Ok(pokemon);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("geracao/{idOuNome?}")]
        public async Task<IActionResult> ObterPokemonsPorGeracao(string? IdOuNome)
        {
            try
            {
                if (string.IsNullOrEmpty(IdOuNome))
                {
                    var pokemons = await _geracaoService.ObterTodosPokemonsAgrupadosPorGeracoes();
                    return Ok(pokemons);
                }
                else
                {
                    var pokemons = int.TryParse(IdOuNome, out int id)
                    ? await _geracaoService.ObterPokemonsPorIdDaGeracao(id)
                    : await _geracaoService.ObterPokemonsPorNomeDaGeracao(IdOuNome);
                    return Ok(pokemons);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet("tipoelemento/{idOuNome?}")]
        public async Task<IActionResult> ObterPokemonsPorTipoElemento(string? IdOuNome)
        {
            try
            {
                if (string.IsNullOrEmpty(IdOuNome))
                {
                    var pokemons = await _tipoElementoService.ObterTodosPokemonsAgrupadosPorTipoElemento();
                    return Ok(pokemons);
                }
                else
                {
                    var pokemons = int.TryParse(IdOuNome, out int id)
                    ? await _tipoElementoService.ObterListaPokemonsPorIdDoTipoElemento(id)
                    : await _tipoElementoService.ObterListaPokemonsPorNomeDoTipoElemento(IdOuNome);
                    return Ok(pokemons);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}