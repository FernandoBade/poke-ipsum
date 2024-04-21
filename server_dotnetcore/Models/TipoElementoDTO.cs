using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class ListaTiposElementosDTO
    {
        [JsonProperty("results")]
        public List<TipoElemento> TiposElementos { get; set; } = [];
    }

    public class TipoElemento
    {
        [JsonProperty("name")]
        public string Nome { get; set; } = string.Empty;

    }
    public class TipoElementoDTO
    {
        [JsonProperty("pokemon")]
        public List<PokemonTipoElemento> PokemonsPorTipoElemento { get; set; } = [];
    }

    public class PokemonTipoElemento
    {
        [JsonProperty("pokemon")]
        public DetalhePokemon? Pokemon { get; set; }
    }

    public class DetalhePokemon
    {
        [JsonProperty("name")]
        public string Nome { get; set; } = string.Empty;
    }
}

