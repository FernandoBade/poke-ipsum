using Newtonsoft.Json;

namespace PokeIpsum.Server.Models
{
    public class ListaGeracoesDTO
    {
        [JsonProperty("results")]
        public List<Geracao> Geracoes { get; set; } = [];
    }

    public class Geracao
    {
        [JsonProperty("name")]
        public string Nome { get; set; } = string.Empty;

        [JsonProperty("url")]
        public string Url { get; set; } = string.Empty;
    }

    public class GeracaoDTO
    {
        [JsonProperty("pokemon_species")]
        public List<PokemonDTO> PokemonsPorGeracao { get; set; } = [];
    }
}