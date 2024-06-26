public enum Modo
{
    PALAVRA,
    FRASE,
    PARAGRAFO
}

public class OpcoesDTO
{
    public List<string> TiposElementos { get; set; } = new List<string>();
    public List<string> Geracoes { get; set; } = new List<string>();
    public List<string> NomesPokemons { get; set; } = new List<string>();
    public int Quantidade { get; set; }
    public Modo Modo { get; set; }
}
