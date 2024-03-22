namespace PokeIpsum.Server.Models
{
    public class PokemonDTO
    {
        public required string Nome { get; set; }
        public required List<PokemonTipoDTO> Tipo { get; set; }
    }

    public class PokemonTipoDTO
    {
        public required TipoDTO Tipo { get; set; }
    }

    public class TipoDTO
    {
        public required string Nome { get; set; }
    }
}
