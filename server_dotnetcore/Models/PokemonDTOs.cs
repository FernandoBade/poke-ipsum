using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class PokemonDTO
    {
        [JsonProperty("name")]
        public string Nome { get; set; } = string.Empty;
    }

    public class ListaPokemonDTO
    {
        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("next")]
        public string? Next { get; set; }

        [JsonProperty("previous")]
        public string? Previous { get; set; }

        [JsonProperty("results")]
        public required List<PokemonDTO> Results { get; set; }
    }
}