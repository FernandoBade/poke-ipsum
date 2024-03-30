public enum Modo
{
    PALAVRA,
    FRASE,
    PARAGRAFO
}

public class OpcoesDTO
{
    public List<string> NomesPokemons { get; set; } = new List<string>();
    public int Quantidade { get; set; }
    public Modo Modo { get; set; }
    public bool IniciarComPokeIpsumDolor { get; set; }
}
