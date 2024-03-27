// No MVC tem um monte de funcionalidades para manupular API's, ai to testando pra ver se rola desse jeito
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PokeIpsum.Server.Models;

namespace PokeIpsum.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PokeAPIController : ControllerBase
    {
        private readonly HttpClient _http;
        private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/";

        public PokeAPIController(HttpClient http)
        {
            _http = http;
        }
        [HttpGet("id/{id}")]
        public async Task<IActionResult> ObterPokemonPorId(int id)
        {
            var endpointPokemon = $"{_pokeapiURL}pokemon/{id}";
            var resposta = await _http.GetAsync(endpointPokemon);

            if (resposta.IsSuccessStatusCode)

            {
                var conteudo = await resposta.Content.ReadAsStringAsync();
                var pokemon = JsonConvert.DeserializeObject<PokemonDTO>(conteudo);

                if (pokemon != null && !string.IsNullOrEmpty(pokemon.Nome))
                {
                    return Ok(new PokemonDTO
                    {
                        Id = pokemon.Id,
                        Nome = pokemon.Nome
                    });
                }
                else
                {
                    return BadRequest("Não foi possível obter os dados do Pokémon solicitado.");
                }
            }
            else
            {
                // Se der merda, retorna o status e o stack trace
                return StatusCode((int)resposta.StatusCode, "Falha na requisição/conexão.");
            }
        }

        [HttpGet("geracao")]
        public async Task<IActionResult> ObterListaGeracoes()
        {
            var endpointGeracoes = $"{_pokeapiURL}generation/";
            var resposta = await _http.GetAsync(endpointGeracoes);

            if (resposta.IsSuccessStatusCode)
            {
                var conteudo = await resposta.Content.ReadAsStringAsync();
                var listaGeracoes = JsonConvert.DeserializeObject<ListaGeracoesDTO>(conteudo);
                return Ok(listaGeracoes);
            }
            else
            {
                return StatusCode((int)resposta.StatusCode, "Falha na requisição/conexão.");
            }
        }

        [HttpGet("geracao/{id}")]
        public async Task<IActionResult> ObterPokemonsPorGeracao(int id)
        {
            var endpointGeracao = $"{_pokeapiURL}generation/{id}";
            var resposta = await _http.GetAsync(endpointGeracao);

            if (resposta.IsSuccessStatusCode)
            {
                var conteudo = await resposta.Content.ReadAsStringAsync();
                var pokemonsDaGeracao = JsonConvert.DeserializeObject<GeracaoDTO>(conteudo);
                return Ok(pokemonsDaGeracao);
            }
            else
            {
                return StatusCode((int)resposta.StatusCode, "Falha na requisição/conexão.");
            }
        }

        [HttpGet("tipoelemento")]
        public async Task<IActionResult> ObterListaTiposElementos()
        {
            var endpointTipoElemento = $"{_pokeapiURL}type/";
            var resposta = await _http.GetAsync(endpointTipoElemento);

            if (resposta.IsSuccessStatusCode)
            {
                var conteudo = await resposta.Content.ReadAsStringAsync();
                var listaTipoElemento = JsonConvert.DeserializeObject<ListaGeracoesDTO>(conteudo);
                return Ok(listaTipoElemento);
            }
            else
            {
                return StatusCode((int)resposta.StatusCode, "Falha na requisição/conexão.");
            }
        }

        [HttpGet("tipoelemento/{id}")]
        public async Task<IActionResult> ObterListaPokemonsPorTipoElemento(int id)
        {
            var endpointTipoElemento = $"{_pokeapiURL}type/{id}";
            var resposta = await _http.GetAsync(endpointTipoElemento);

            if (resposta.IsSuccessStatusCode)
            {
                var conteudo = await resposta.Content.ReadAsStringAsync();
                var PokemonsPorTipoElemento = JsonConvert.DeserializeObject<TipoElementoDTO>(conteudo);
                return Ok(PokemonsPorTipoElemento);
            }
            else
            {
                return StatusCode((int)resposta.StatusCode, "Falha na requisição/conexão.");
            }
        }
    }
}
