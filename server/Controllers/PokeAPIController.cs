// No MVC tem um monte de funcionalidades para manupular API's, ai to testando pra ver se rola desse jeito
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PokeIpsum.Server.Models;

namespace PokeIpsum.Server.Controllers
{
    // Aqui aplico o atributo [ApiController], isso informa que aqui vai ser uma classe controller pra manimular API's
    // Ela vem no pacote daquel .Mmc ali em cima
    [ApiController]

    // Quando alguém acessar [URL]/pokeapi, será direcionado para este controller
    // É tipo o arquivos Routes do Express.
    [Route("[controller]")]
    public class PokeAPIController : ControllerBase
    {
        // Precisei de um cliente HTTP para fazer requisições para outras APIs
        // Declarei como 'readonly' pq acho que só precisarei definir ele uma vez, no construtor
        private readonly HttpClient _http;
        private readonly string _pokeapiURL = "https://pokeapi.co/api/v2/";

        public PokeAPIController(HttpClient http)
        {
            _http = http;
        }

        // Aqui setamos a rota como "Get"
        // Se fosse no Express, seria algo como: `router.get('/pokemon/:id')`
        [HttpGet("id/{id}")]
        public async Task<IActionResult> ObterPokemonPorId(int id)
        {
            var endpointPokemon = $"{_pokeapiURL}pokemon/{id}";
            var resposta = await _http.GetAsync(endpointPokemon);

            if (resposta.IsSuccessStatusCode) // Não precisa verificar se era status 200, 201 ou outro de successo pq o pacote já tem o método.

            {
                var conteudo = await resposta.Content.ReadAsStringAsync();
                var pokemon = JsonConvert.DeserializeObject<PokemonDTO>(conteudo);

                if (pokemon != null && !string.IsNullOrEmpty(pokemon.Nome))
                {
                    return Ok(new PokemonDTO
                    {
                        Id = pokemon.Id,
                        Nome = pokemon.Nome
                    }); // Pra pra enviar o payload ele já vai junto com o status Ok (200, 201, etc) numa coisa só
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

        [HttpGet("geracao/{id}")]
        public async Task<IActionResult> ObterPokemonsPorGeracao(int id)
        {
            var endpointGeracao = $"{_pokeapiURL}generation/{id}";
            var resposta = await _http.GetAsync(endpointGeracao);

            if (resposta.IsSuccessStatusCode)
            {
                var conteudo = await resposta.Content.ReadAsStringAsync();
                var geracao = JsonConvert.DeserializeObject<GeracaoDTO>(conteudo);
                return Ok(geracao);
            }
            else
            {
                return StatusCode((int)resposta.StatusCode, "Falha na requisição/conexão.");
            }
        }
    }
}
