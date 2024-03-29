using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class ListaTiposElementosDTO
    {
        [JsonProperty("results")]
        public List<TipoElemento> TiposElementos { get; set; } = new List<TipoElemento>();
    }

    public class TipoElemento
    {
        [JsonProperty("name")]
        public string Nome { get; set; } = string.Empty;

        [JsonProperty("url")]
        public string Url { get; set; } = string.Empty;
    }

    public class TipoElementoDTO
    {
        [JsonProperty("pokemon")]
        public List<PokemonPorTipoDTO> PokemonsPorTipoElemento { get; set; } = new List<PokemonPorTipoDTO>();
    }

    public class PokemonPorTipoDTO
    {
        [JsonProperty("pokemon")]
        public PokemonInfo Pokemon { get; set; } = new PokemonInfo();
    }

    public class PokemonInfo
    {
        [JsonProperty("name")]
        public string Nome { get; set; } = string.Empty;

        [JsonProperty("url")]
        public string Url { get; set; } = string.Empty;
    }
}
