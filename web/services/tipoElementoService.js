import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';

dotenv.config();
const cache = new NodeCache({ stdTTL: 180 * 24 * 60 * 60 }); // 1 ano
const pokeapiURL = `${process.env.POKEAPI_URL}type/`;

async function obterListaTiposElementos() {
    const chaveCache = 'listaTiposElementos';
    let listaTipos = cache.get(chaveCache);

    if (!listaTipos) {
        const url = pokeapiURL;
        const response = await axios.get(url);
        listaTipos = response.data.results.map(tipo => ({ nome: tipo.name }));
        cache.set(chaveCache, listaTipos);
    }

    return listaTipos;
}

async function obterTipoElementoPorId(id) {
    const chaveCache = `tipoElementoPorId-${id}`;
    let tipoElemento = cache.get(chaveCache);

    if (!tipoElemento) {
        if (!id) return obterTodosTiposElementos();

        const url = `${pokeapiURL}${id}`;
        const response = await axios.get(url);
        if (response.status === 200) {
            tipoElemento = {
                nome: response.data.name,
                pokemonsPorTipoElemento: response.data.pokemon.map(p => ({ nome: p.pokemon.name }))
            };
            cache.set(chaveCache, tipoElemento);
        } else {
            throw new Error(`Erro ao buscar tipo de elemento com ID: ${id}`);
        }
    }

    return tipoElemento;
}

async function obterTodosTiposElementos() {
    const chaveCache = 'todosTiposElementos';
    let todosTipos = cache.get(chaveCache);

    if (!todosTipos) {
        const url = pokeapiURL;
        const response = await axios.get(url);
        if (response.status === 200) {
            todosTipos = response.data.results.map(tipo => obterTipoElementoPorId(tipo.url.split('/').filter(Boolean).pop()));
            cache.set(chaveCache, todosTipos);
        } else {
            throw new Error('Erro ao buscar todos os tipos de elementos');
        }
    }

    return todosTipos;
}

async function obterTipoElementoPorNome(nome) {
    const chaveCache = `tipoElementoPorNome-${nome}`;
    let tipoElemento = cache.get(chaveCache);

    if (!tipoElemento) {
        const url = `${pokeapiURL}${nome}`;
        const response = await axios.get(url);
        tipoElemento = { nome: response.data.name };
        cache.set(chaveCache, tipoElemento);
    }

    return tipoElemento;
}

async function obterListaPokemonsPorNomeDoTipoElemento(nome) {
    const chaveCache = `listaPokemonsPorNome-${nome}`;
    let pokemonsTipo = cache.get(chaveCache);

    if (!pokemonsTipo) {
        const url = `${pokeapiURL}${nome}`;
        const response = await axios.get(url);
        if (response.status !== 200) {
            console.error(`Erro ao buscar pokemons para o tipo ${nome}, status code: ${response.status}`);
            return null;
        }
        pokemonsTipo = {
            pokemonsPorTipoElemento: response.data.pokemon.map(p => ({ nome: p.pokemon.name }))
        };
        cache.set(chaveCache, pokemonsTipo);
    }

    return pokemonsTipo;
}

async function obterTodosPokemonsAgrupadosPorTipoElemento() {
    const chaveCache = 'todosPokemonsAgrupadosPorTipoElemento';
    let pokemonsAgrupados = cache.get(chaveCache);

    if (!pokemonsAgrupados) {
        const listaTiposElementos = await obterListaTiposElementos();
        pokemonsAgrupados = {};

        for (const tipoElemento of listaTiposElementos) {
            const chaveTipoElemento = `all-pokemons-by-type-element-${tipoElemento.nome}`;
            let pokemonsTipoElemento = cache.get(chaveTipoElemento);

            if (!pokemonsTipoElemento) {
                const tipoElementoData = await obterListaPokemonsPorNomeDoTipoElemento(tipoElemento.nome);
                pokemonsTipoElemento = tipoElementoData.pokemonsPorTipoElemento;
                cache.set(chaveTipoElemento, pokemonsTipoElemento);
            }

            if (pokemonsTipoElemento) {
                pokemonsAgrupados[tipoElemento.nome] = pokemonsTipoElemento;
            }
        }

        cache.set(chaveCache, pokemonsAgrupados);
    }

    return pokemonsAgrupados;
}

export {
    obterTodosTiposElementos,
    obterListaTiposElementos,
    obterTipoElementoPorId,
    obterTipoElementoPorNome,
    obterListaPokemonsPorNomeDoTipoElemento,
    obterTodosPokemonsAgrupadosPorTipoElemento
};