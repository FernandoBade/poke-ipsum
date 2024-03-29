using Microsoft.AspNetCore.Mvc;

namespace PokeIpsum.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PokeAPIController : ControllerBase
    {
        private readonly PokemonService _pokemonService;
        private readonly GeracaoService _geracaoService;
        private readonly TipoElementoService _tipoElementoService;

        public PokeAPIController(PokemonService pokemonService, GeracaoService geracaoService, TipoElementoService tipoElementoService)
        {
            _pokemonService = pokemonService;
            _geracaoService = geracaoService;
            _tipoElementoService = tipoElementoService;
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> ObterPokemonPorId(int id)
        {
            try
            {
                var pokemon = await _pokemonService.ObterPokemonPorId(id);
                return Ok(pokemon);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("geracao")]
        public async Task<IActionResult> ObterListaGeracoes()
        {
            try
            {
                var geracoes = await _geracaoService.ObterListaGeracoes();
                return Ok(geracoes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("geracao/{id}")]
        public async Task<IActionResult> ObterPokemonsPorGeracao(int id)
        {
            try
            {
                var pokemons = await _geracaoService.ObterPokemonsPorGeracao(id);
                return Ok(pokemons);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("tipoelemento")]
        public async Task<IActionResult> ObterListaTiposElementos()
        {
            try
            {
                var tipos = await _tipoElementoService.ObterListaTiposElementos();
                return Ok(tipos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("tipoelemento/{id}")]
        public async Task<IActionResult> ObterListaPokemonsPorTipoElemento(int id)
        {
            try
            {
                var pokemons = await _tipoElementoService.ObterListaPokemonsPorTipoElemento(id);
                return Ok(pokemons);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
