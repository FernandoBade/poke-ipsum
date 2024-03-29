namespace test;
using Moq;
using Moq.Protected;
using System.Net;
using System.Net.Http;
using System.Threading;
using FluentAssertions;

[TestClass]
public class PokemonServiceTests
{
    [TestMethod]
    public async Task ObterPokemonPorId_ReturnsPokemonDTO()
    {
        // Arrange
        var mockHttpMessageHandler = new Mock<HttpMessageHandler>();
        var response = new HttpResponseMessage
        {
            StatusCode = HttpStatusCode.OK,
            Content = new StringContent("{ \"id\": 1, \"name\": \"Bulbasaur\" }"),
        };

        mockHttpMessageHandler.Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(response);

        var httpClient = new HttpClient(mockHttpMessageHandler.Object);
        var pokemonService = new PokemonService(httpClient);

        // Act
        var result = await pokemonService.ObterPokemonPorId(1);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual("Bulbasaur", result.Nome);
    }
}