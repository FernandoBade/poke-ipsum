using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class PokemonDTO
    {
        [JsonProperty("name")]
        public int Id { get; set; }

        public string Nome { get; set; }
    }

}

