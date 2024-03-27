using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class TipoElementoDTO
    {
        [JsonProperty("pokemon")]
        public List<PokemonPorTipoElemento> PokemonsPorTipoElemento { get; set; } = new List<PokemonPorTipoElemento>();
    }

    public class PokemonPorTipoElemento
    {
        [JsonProperty("pokemon")]
        public PokemonPorTipoElementoDTO Pokemon { get; set; }
    }

    public class PokemonPorTipoElementoDTO
    {
        [JsonProperty("name")]
        public string Nome { get; set; }
        
        [JsonProperty("url")]
        public string URL { get; set; }
    }
}
