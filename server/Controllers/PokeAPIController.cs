using Microsoft.AspNetCore.Mvc;

namespace PokeIpsum.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PokeAPIController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public PokeAPIController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("pokemon/{id}")]
        public async Task<IActionResult> GetPokemon(int id)
        {
            string requestUri = $"https://pokeapi.co/api/v2/pokemon/{id}";
            HttpResponseMessage response = await _httpClient.GetAsync(requestUri);

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

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("O PokeAPIController está respondendo!");
        }

    }
}
