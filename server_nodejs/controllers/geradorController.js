import express from 'express';
import { obterTodosOsPokemons } from '../services/pokemonService.js';
import { obterPokemonsPorNomeDaGeracao, obterTodosPokemonsAgrupadosPorGeracoes } from '../services/geracaoService.js';
import { obterTipoElementoPorId, obterTodosPokemonsAgrupadosPorTipoElemento } from '../services/tipoElementoService.js';

const router = express.Router();

router.get('/pokeipsum', async (req, res) => {
    const { tiposElementos = "", geracoes = "", quantidade = 5, modo = "PARAGRAFO" } = req.query;

    try {
        const resultados = await buscarPokemonsPorFiltroDoUsuario(tiposElementos, geracoes, quantidade, modo);
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const excecoes = new Set(["mr-mime", "mime-jr", "ho-oh", "porygon-z"]);

async function buscarPokemonsPorFiltroDoUsuario(tiposElementos, geracoes, quantidade, modo) {
    const filtradosPorTipo = new Set();
    const filtradosPorGeracao = new Set();

    if (!tiposElementos) {
        const todosTipos = await obterTodosPokemonsAgrupadosPorTipoElemento();
        Object.keys(todosTipos).forEach(tipo => {
            todosTipos[tipo].forEach(pokemon => {
                filtradosPorTipo.add(pokemon.nome.split('-')[0]);
            });
        });
    } else {
        const tiposElementoList = tiposElementos.split(',');
        for (const tipoElemento of tiposElementoList) {
            const pokemonsPorTipoElemento = await obterTipoElementoPorId(tipoElemento.trim());
            if (pokemonsPorTipoElemento && pokemonsPorTipoElemento.pokemonsPorTipoElemento) {
                pokemonsPorTipoElemento.pokemonsPorTipoElemento.forEach(te => {
                    if (!excecoes.has(te.nome.toLowerCase())) {
                        filtradosPorTipo.add(te.nome.split('-')[0]);
                    }
                });
            }
        }
    }

    if (!geracoes) {
        const geracoes = await obterTodosPokemonsAgrupadosPorGeracoes();
        Object.keys(geracoes).forEach(tipo => {
            geracoes[tipo].forEach(pokemon => {
                filtradosPorGeracao.add(pokemon.nome.split('-')[0]);
            });
        });
    } else {
        const geracoesList = geracoes.split(',');
        for (const geracao of geracoesList) {
            const pokemonsPorGeracaoData = await obterPokemonsPorNomeDaGeracao(geracao.trim());
            const pokemonsPorGeracao = pokemonsPorGeracaoData.pokemonsPorGeracao;
            if (pokemonsPorGeracao && Array.isArray(pokemonsPorGeracao)) {
                pokemonsPorGeracao.forEach(g => {
                    if (g && g.nome && !excecoes.has(g.nome.toLowerCase())) {
                        filtradosPorGeracao.add(g.nome.split('-')[0]);
                    }
                });
            }
        }
    }

    let nomesPokemonsFiltrados = new Set();

    if (filtradosPorTipo.size && filtradosPorGeracao.size) {
        filtradosPorTipo.forEach(pokemon => {
            if (filtradosPorGeracao.has(pokemon)) {
                nomesPokemonsFiltrados.add(pokemon);
            }
        });
    } else {
        const todosPokemons = await obterTodosOsPokemons();
        todosPokemons.forEach(p => {
            if (!excecoes.has(p.nome.toLowerCase())) {
                nomesPokemonsFiltrados.add(p.nome.split('-')[0]);
            }
        });
    }

    return gerarPokeIpsum(Array.from(nomesPokemonsFiltrados), parseInt(quantidade), modo);

}



function gerarPokeIpsum(nomesPokemons, quantidade, modo) {

    const resultados = [];
    const random = Math.random;
    const titleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    switch (modo.toUpperCase()) {
        case "PALAVRA":
            for (let i = 0; i < quantidade; i++) {
                resultados.push(titleCase(nomesPokemons[Math.floor(random() * nomesPokemons.length)]));
            }
            break;

        case "FRASE":
            for (let i = 0; i < quantidade; i++) {
                let frase = Array.from({ length: Math.floor(random() * 6 + 5) }, () =>
                    titleCase(nomesPokemons[Math.floor(random() * nomesPokemons.length)])
                ).join(' ') + '.';
                resultados.push(frase);
            }
            break;

        case "PARAGRAFO":
            for (let i = 0; i < quantidade; i++) {
                let paragrafo = Array.from({ length: Math.floor(random() * 3 + 2) }, () => {
                    return Array.from({ length: Math.floor(random() * 6 + 5) }, () =>
                        titleCase(nomesPokemons[Math.floor(random() * nomesPokemons.length)])
                    ).join(' ') + '.';
                }).join(' ');
                resultados.push(paragrafo);
            }
            break;

        default:
            throw new Error("Invalid mode. You must choose between PARAGRAPH (PARAGRAFO), SENTENCE (FRASE), or WORD (PALAVRA).");
    }

    return resultados;
}


export default router;
