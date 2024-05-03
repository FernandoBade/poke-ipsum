import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();
const cache = new NodeCache();
const pokeapiURL = `${process.env.POKEAPI_URL}generation/`;

async function obterListaGeracoes() {
    const url = pokeapiURL;
    const response = await axios.get(url);
    return response.data.results.map(ger => ({ nome: ger.name }));
}

async function obterPokemonsPorIdDaGeracao(id) {
    const url = `${pokeapiURL}${id}`;
    const response = await axios.get(url);
    return {
        pokemonsPorGeracao: response.data.pokemon_species.map(ps => ({ nome: ps.name }))
    };
}

async function obterPokemonsPorNomeDaGeracao(nome) {
    const url = `${pokeapiURL}${nome}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
        console.error(`Failed to fetch pokemons for generation ${nome}, status code: ${response.status}`);
        return null;
    }
    return {
        pokemonsPorGeracao: response.data.pokemon_species.map(ps => ({ nome: ps.name }))
    };
}

async function obterTodosPokemonsAgrupadosPorGeracoes() {
    const listaGeracoes = await obterListaGeracoes();
    const pokemonsAgrupadosPorGeracao = {};
    const ano = new Date().getFullYear();
    const umAnoEmSegundos = 365 * 24 * 60 * 60;

    for (const geracao of listaGeracoes) {
        const chaveCache = `all-pokemons-by-${geracao.nome}-${ano}`;
        let pokemonsPorGeracao = cache.get(chaveCache);

        if (!pokemonsPorGeracao) {
            const geracaoData = await obterPokemonsPorNomeDaGeracao(geracao.nome);
            pokemonsPorGeracao = geracaoData.pokemonsPorGeracao;
            cache.set(chaveCache, pokemonsPorGeracao, umAnoEmSegundos);
        }

        if (pokemonsPorGeracao) {
            pokemonsAgrupadosPorGeracao[geracao.nome] = pokemonsPorGeracao;
        }
    }

    return pokemonsAgrupadosPorGeracao;
}


export { obterListaGeracoes, obterPokemonsPorIdDaGeracao, obterPokemonsPorNomeDaGeracao, obterTodosPokemonsAgrupadosPorGeracoes };
