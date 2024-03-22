// No MVC tem um monte de funcionalidades para manupular API's, ai to testando pra ver se rola desse jeito
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
        public async Task<IActionResult> GetPokemonPorId(int id)
        {
            string endpointPokemon = $"{_pokeapiURL}/pokemon/{id}";

            HttpResponseMessage response = await _http.GetAsync(endpointPokemon);

            // Não preciso verificar se era status 200, 201 ou outro de successo pq o pacote já tem o método.
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync(); // Descobri que tem um método pra ler a resposta como string
                return Ok(content); // Pra pra enviar o payload e ele já vai junto com o status OK (200, 201, etc) numa coisa só
            }
            else
            {
                // Se der merda, retorna o status e o stack trace
                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }
        }

        [HttpGet("geracao/{id}")]
        public async Task<IActionResult> GetPokemonPorGeracao(int id)
        {
            string endpointGeracao = $"{_pokeapiURL}/generation/{id}";
            HttpResponseMessage response = await _http.GetAsync(endpointGeracao);

            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                return Ok(content);
            }
            else
            {
                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }
        }

        [HttpGet("tipo/{id}")]
        public async Task<IActionResult> GetPokemonPorTipo(int id)
        {
            string endpointTipo = $"{_pokeapiURL}/type/{id}";
            HttpResponseMessage response = await _http.GetAsync(endpointTipo);

            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                // Altera aqui para deserializar para o tipo SimplePokemonDTO
                var pokemonTipo = JsonConvert.DeserializeObject<PokemonDTO>(content);

                // Verifica se a lista Tipo não é nula e contém elementos
                if (pokemonTipo?.Tipo != null && pokemonTipo.Tipo.Any())
                {
                    return Ok(pokemonTipo);
                }
                else
                {
                    return NotFound("Não encontramos nenhum Pokemon para o tipo informado.");
                }
            }
            else
            {
                return StatusCode((int)response.StatusCode, response.ReasonPhrase);
            }
        }

    }
}
