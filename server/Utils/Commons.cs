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
                    throw new ArgumentNullException(nameof(resultado), $"A resposta da API não retornou nenhum dado.");
                }

                return resultado;
            }
            else
            {
                throw new HttpRequestException($"Falha na requisição à API. Status: {resposta.StatusCode}. Mensagem: {resposta.ReasonPhrase}");
            }
        }
    }
}