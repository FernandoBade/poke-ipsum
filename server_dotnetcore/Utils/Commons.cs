using Newtonsoft.Json;

namespace PokeIpsum
{
    public static class Commons
    {
        public static async Task<T> TratarRespostaAPI<T>(HttpResponseMessage resposta)
        {
            if (resposta.IsSuccessStatusCode)
            {
                var conteudo = await resposta.Content.ReadAsStringAsync();
                var resultado = JsonConvert.DeserializeObject<T>(conteudo);

                if (resultado == null)
                {
                    throw new ArgumentNullException(nameof(resultado), $"The PokéAPI response returned no data.");
                }

                return resultado;
            }
            else
            {
                throw new HttpRequestException($"Request to the PokéAPI failed. Status: {resposta.StatusCode}. Message: {resposta.ReasonPhrase}");
            }
        }
    }
}