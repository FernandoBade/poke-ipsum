import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import { extrairNomes } from '../utils/commons.js';

dotenv.config();

const cache = new NodeCache({ stdTTL: 180 * 24 * 60 * 60 }); // 1 ano
const pokeapiURL = `${process.env.POKEAPI_URL}pokemon/`;

async function obterPokemonPorId(id) {
    const chaveCache = `pokemonPorId-${id}`;
    let pokemon = cache.get(chaveCache);

    if (!pokemon) {
        const url = `${pokeapiURL}${id}`;
        const response = await axios.get(url);
        if (response.data) {
            pokemon = { nome: response.data.name };
            cache.set(chaveCache, pokemon);
        } else {
            throw new Error('Erro ao buscar Pokemon por ID');
        }
    }

    return pokemon;
}

async function obterPokemonPorNome(nome) {
    const chaveCache = `pokemonPorNome-${nome}`;
    let pokemon = cache.get(chaveCache);

    if (!pokemon) {
        const url = `${pokeapiURL}${nome}`;
        const response = await axios.get(url);
        if (response.data) {
            pokemon = { nome: response.data.name };
            cache.set(chaveCache, pokemon);
        } else {
            throw new Error('Erro ao buscar Pokemon por Nome');
        }
    }

    return pokemon;
}

async function obterTodosOsPokemons() {
    const chaveCache = 'todosOsPokemons';
    let pokemons = cache.get(chaveCache);

    if (!pokemons) {
        const url = `${pokeapiURL}?limit=99999`;
        const response = await axios.get(url);
        if (response.data && response.data.results) {
            pokemons = extrairNomes(response.data.results);
            cache.set(chaveCache, pokemons);
        } else {
            throw new Error('Erro ao buscar todos os Pokémons');
        }
    }

    return pokemons || [];
}

export {
    obterPokemonPorId,
    obterPokemonPorNome,
    obterTodosOsPokemons
};
