import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import { extrairNomes } from '../utils/commons.js';

dotenv.config();

const cache = new NodeCache();
const pokeapiURL = `${process.env.POKEAPI_URL}pokemon/`;

async function obterPokemonPorId(id) {
    const url = `${pokeapiURL}${id}`;
    const response = await axios.get(url);
    if (response.data) {
        return { nome: response.data.name };
    }
    throw new Error('No data returned');
}

async function obterPokemonPorNome(nome) {
    const url = `${pokeapiURL}${nome}`;
    const response = await axios.get(url);
    if (response.data) {
        return { nome: response.data.name };
    }
    throw new Error('No data returned');
}

async function obterTodosOsPokemons() {
    const chaveCache = new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    let pokemons = cache.get(chaveCache);

    if (!pokemons) {
        const url = `${pokeapiURL}?limit=99999`;
        const response = await axios.get(url);
        if (response.data && response.data.results) {
            pokemons = extrairNomes(response.data.results);
            cache.set(chaveCache, pokemons, 2592000);
        } else {
            throw new Error('No data returned');
        }
    }
    return pokemons || [];
}

export { obterPokemonPorId, obterPokemonPorNome, obterTodosOsPokemons };