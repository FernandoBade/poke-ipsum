import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();
const cache = new NodeCache();
const pokeapiURL = `${process.env.POKEAPI_URL}type/`;

async function obterListaTiposElementos() {
    const url = pokeapiURL;
    const response = await axios.get(url);
    return response.data.results.map(tipo => ({ nome: tipo.name }));
}

async function obterTipoElementoPorId(id) {
    if (!id) return obterTodosTiposElementos();

    const url = `${pokeapiURL}${id}`;
    const response = await axios.get(url);
    if (response.status === 200) {
        return {
            nome: response.data.name,
            pokemonsPorTipoElemento: response.data.pokemon.map(p => ({ nome: p.pokemon.name }))
        };
    } else {
        throw new Error(`Erro ao buscar tipo de elemento com ID: ${id}`);
    }
}

async function obterTodosTiposElementos() {
    const url = pokeapiURL;
    const response = await axios.get(url);
    if (response.status === 200) {
        return response.data.results.map(tipo => obterTipoElementoPorId(tipo.url.split('/').filter(Boolean).pop()));
    } else {
        throw new Error('Erro ao buscar todos os tipos de elementos');
    }
}

async function obterTipoElementoPorNome(nome) {
    const url = `${pokeapiURL}${nome}`;
    const response = await axios.get(url);
    return { nome: response.data.name };
}

async function obterListaPokemonsPorNomeDoTipoElemento(nome) {
    const url = `${pokeapiURL}${nome}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
        console.error(`Failed to fetch pokemons for type ${nome}, status code: ${response.status}`);
        return null;
    }
    return {
        pokemonsPorTipoElemento: response.data.pokemon.map(p => ({ nome: p.pokemon.name }))
    };
}

async function obterTodosPokemonsAgrupadosPorTipoElemento() {
    const listaTiposElementos = await obterListaTiposElementos();
    const pokemonsAgrupadosPorTipoElemento = {};
    const ano = new Date().getFullYear(); 
    const umAnoEmSegundos = 365 * 24 * 60 * 60;

    for (const tipoElemento of listaTiposElementos) {
        const chaveCache = `all-pokemons-by-type-element-${tipoElemento.nome}-${ano}`;
        let pokemonsTipoElemento = cache.get(chaveCache);

        if (!pokemonsTipoElemento) {
            const tipoElementoData = await obterListaPokemonsPorNomeDoTipoElemento(tipoElemento.nome);
            pokemonsTipoElemento = tipoElementoData.pokemonsPorTipoElemento;
            cache.set(chaveCache, pokemonsTipoElemento, umAnoEmSegundos);
        }

        if (pokemonsTipoElemento) {
            pokemonsAgrupadosPorTipoElemento[tipoElemento.nome] = pokemonsTipoElemento;
        }
    }

    return pokemonsAgrupadosPorTipoElemento;
}

export {
    obterTodosTiposElementos,
    obterListaTiposElementos,
    obterTipoElementoPorId,
    obterTipoElementoPorNome,
    obterListaPokemonsPorNomeDoTipoElemento,
    obterTodosPokemonsAgrupadosPorTipoElemento
};
