import { obterTodosOsPokemons } from '../../../services/pokemonService';
import { obterPokemonsPorNomeDaGeracao, obterTodosPokemonsAgrupadosPorGeracoes } from '../../../services/geracaoService';
import { obterTipoElementoPorId, obterTodosPokemonsAgrupadosPorTipoElemento } from '../../../services/tipoElementoService';

const excecoes = new Set(['mr-mime', 'mime-jr', 'ho-oh', 'porygon-z']);

async function buscarPokemonsPorFiltroDoUsuario(tiposElementos, geracoes) {
    const filtradosPorTipo = new Set();
    const filtradosPorGeracao = new Set();

    if (!tiposElementos || tiposElementos === '0') {
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
                        filtradosPorTipo.add(te.nome);
                    }
                });
            }
        }
    }

    if (!geracoes || geracoes === '0') {
        const todasGeracoes = await obterTodosPokemonsAgrupadosPorGeracoes();
        Object.keys(todasGeracoes).forEach(tipo => {
            todasGeracoes[tipo].forEach(pokemon => {
                filtradosPorGeracao.add(pokemon.nome);
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
                        filtradosPorGeracao.add(g.nome);
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

    return Array.from(nomesPokemonsFiltrados);
}

function gerarPokeIpsum(nomesPokemons, quantidade, modo) {
    const resultados = [];
    const random = Math.random;
    const titleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    switch (modo.toUpperCase()) {
        case 'PALAVRA':
            for (let i = 0; i < quantidade; i++) {
                resultados.push(titleCase(nomesPokemons[Math.floor(random() * nomesPokemons.length)]));
            }
            break;

        case 'FRASE':
            for (let i = 0; i < quantidade; i++) {
                let frase = Array.from({ length: Math.floor(random() * 10 + 15) }, () =>
                    nomesPokemons[Math.floor(random() * nomesPokemons.length)].toLowerCase()
                );
                frase[0] = titleCase(frase[0]);
                resultados.push(frase.join(' ') + '.');
            }
            break;

        case 'PARAGRAFO':
            for (let i = 0; i < quantidade; i++) {
                let paragrafo = Array.from({ length: Math.floor(random() * 8 + 9) }, () => {
                    let frase = Array.from({ length: Math.floor(random() * 5 + 4) }, () =>
                        nomesPokemons[Math.floor(random() * nomesPokemons.length)].toLowerCase()
                    );
                    frase[0] = titleCase(frase[0]);
                    return frase.join(' ') + '.';
                }).join(' ');
                resultados.push(paragrafo);
            }
            break;

        default:
            throw new Error('Modo inválido. Escolha entre PARAGRAFO, FRASE ou PALAVRA.');
    }

    return resultados;
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { tiposElementos = '', geracoes = '', quantidade = 5, modo = 'PARAGRAFO' } = req.query;

        try {
            const nomesPokemons = await buscarPokemonsPorFiltroDoUsuario(tiposElementos, geracoes);
            const resultados = gerarPokeIpsum(nomesPokemons, parseInt(quantidade), modo);
            res.status(200).json(resultados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
