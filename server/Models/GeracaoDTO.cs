using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class GeracaoDTO
    {
        [JsonProperty("pokemon_species")]
        public List<PokemonDaGeracaoDTO> PokemonsDaGeracao { get; set; } = [];
    }

    public class PokemonDaGeracaoDTO
    {
        [JsonProperty("name")]
        public string Nome { get; set; }
        
        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class ListaGeracoesDTO
    {
        [JsonProperty("results")]
        public List<DetalheGeracaoDTO> Geracoes { get; set; }
    }

    public class DetalheGeracaoDTO
    {
        [JsonProperty("name")]
        public string Nome { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }
    }
}
