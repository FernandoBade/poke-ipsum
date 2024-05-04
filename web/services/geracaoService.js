import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();
const cache = new NodeCache({ stdTTL: 180 * 24 * 60 * 60 }); // 1 ano
const pokeapiURL = `${process.env.POKEAPI_URL}generation/`;

async function obterListaGeracoes() {
    const chaveCache = 'listaGeracoes';
    let listaGeracoes = cache.get(chaveCache);

    if (!listaGeracoes) {
        const url = pokeapiURL;
        const response = await axios.get(url);
        listaGeracoes = response.data.results.map(ger => ({ nome: ger.name }));
        cache.set(chaveCache, listaGeracoes);
    }

    return listaGeracoes;
}

async function obterPokemonsPorIdDaGeracao(id) {
    const chaveCache = `pokemonsPorIdDaGeracao-${id}`;
    let pokemonsPorGeracao = cache.get(chaveCache);

    if (!pokemonsPorGeracao) {
        const url = `${pokeapiURL}${id}`;
        const response = await axios.get(url);
        pokemonsPorGeracao = {
            pokemonsPorGeracao: response.data.pokemon_species.map(ps => ({ nome: ps.name }))
        };
        cache.set(chaveCache, pokemonsPorGeracao);
    }

    return pokemonsPorGeracao;
}

async function obterPokemonsPorNomeDaGeracao(nome) {
    const chaveCache = `pokemonsPorNomeDaGeracao-${nome}`;
    let pokemonsPorGeracao = cache.get(chaveCache);

    if (!pokemonsPorGeracao) {
        const url = `${pokeapiURL}${nome}`;
        const response = await axios.get(url);
        if (response.status !== 200) {
            console.error(`Erro ao buscar pokemons para a geração ${nome}, código de status: ${response.status}`);
            return null;
        }
        pokemonsPorGeracao = {
            pokemonsPorGeracao: response.data.pokemon_species.map(ps => ({ nome: ps.name }))
        };
        cache.set(chaveCache, pokemonsPorGeracao);
    }

    return pokemonsPorGeracao;
}

async function obterTodosPokemonsAgrupadosPorGeracoes() {
    const chaveCache = 'todosPokemonsAgrupadosPorGeracoes';
    let pokemonsAgrupados = cache.get(chaveCache);

    if (!pokemonsAgrupados) {
        const listaGeracoes = await obterListaGeracoes();
        pokemonsAgrupados = {};
        const umAnoEmSegundos = 365 * 24 * 60 * 60;

        for (const geracao of listaGeracoes) {
            const chaveGeracao = `all-pokemons-by-${geracao.nome}`;
            let pokemonsPorGeracao = cache.get(chaveGeracao);

            if (!pokemonsPorGeracao) {
                const geracaoData = await obterPokemonsPorNomeDaGeracao(geracao.nome);
                pokemonsPorGeracao = geracaoData.pokemonsPorGeracao;
                cache.set(chaveGeracao, pokemonsPorGeracao, umAnoEmSegundos);
            }

            if (pokemonsPorGeracao) {
                pokemonsAgrupados[geracao.nome] = pokemonsPorGeracao;
            }
        }

        cache.set(chaveCache, pokemonsAgrupados, umAnoEmSegundos);
    }

    return pokemonsAgrupados;
}

export {
    obterListaGeracoes,
    obterPokemonsPorIdDaGeracao,
    obterPokemonsPorNomeDaGeracao,
    obterTodosPokemonsAgrupadosPorGeracoes
};
