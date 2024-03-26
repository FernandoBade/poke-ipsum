using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class GeracaoDTO
    {
        [JsonProperty("pokemon_species")]
        public List<PokemonsDaGeracao> PokemonsDaGeracao { get; set; } = new List<PokemonsDaGeracao>();
    }

    public class PokemonsDaGeracao
    {
        [JsonProperty("name")]
        public string Nome { get; set; }
    }
}
