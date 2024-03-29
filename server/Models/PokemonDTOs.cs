using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class PokemonDTO
    {
        [JsonProperty("name")]
        public string Nome { get; set; } = string.Empty;

        [JsonProperty("url")]
        public string Url { get; set; } = string.Empty;
    }
}