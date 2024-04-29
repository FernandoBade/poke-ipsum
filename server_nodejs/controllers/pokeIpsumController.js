import express from 'express';
import { obterPokemonPorId, obterPokemonPorNome, obterTodosOsPokemons } from '../services/pokemonService.js';
import { obterListaGeracoes, obterTodosPokemonsAgrupadosPorGeracoes, obterPokemonsPorNomeDaGeracao, obterPokemonsPorIdDaGeracao } from '../services/geracaoService.js';
import { obterListaTiposElementos, obterTodosPokemonsAgrupadosPorTipoElemento, obterTipoElementoPorNome, obterTipoElementoPorId, obterListaPokemonsPorNomeDoTipoElemento } from '../services/tipoElementoService.js';

const router = express.Router();

router.get('/pokemon/:idOuNome?', async (req, res) => {
    const { idOuNome } = req.params;
    try {
        if (!idOuNome) {
            const pokemons = await obterTodosOsPokemons();
            res.json(pokemons);
        } else {
            const pokemon = isNaN(parseInt(idOuNome))
                ? await obterPokemonPorNome(idOuNome)
                : await obterPokemonPorId(parseInt(idOuNome));
            res.json(pokemon);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/geracao', async (req, res) => {
    try {
        const geracao = await obterListaGeracoes();
        res.json(geracao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/geracao/:idOuNome', async (req, res) => {
    const { idOuNome } = req.params;
    try {
        const geracaoData = isNaN(parseInt(idOuNome))
            ? await obterPokemonsPorNomeDaGeracao(idOuNome)
            : await obterPokemonsPorIdDaGeracao(parseInt(idOuNome));
        res.json(geracaoData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/agruparPokemonsPorGeracao', async (req, res) => {
    try {
        const todosAgrupados = await obterTodosPokemonsAgrupadosPorGeracoes();
        res.json(todosAgrupados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/tipoelemento', async (req, res) => {
    try {
        const tipoelemento = await obterListaTiposElementos();
        res.json(tipoelemento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/tipoElemento/:idOuNome', async (req, res) => {
    const { idOuNome } = req.params;
    try {
        const tipoElemento = isNaN(parseInt(idOuNome))
            ? await obterTipoElementoPorNome(idOuNome)
            : await obterTipoElementoPorId(parseInt(idOuNome));
        if (tipoElemento) {
            const pokemonsPorTipoElemento = await obterListaPokemonsPorNomeDoTipoElemento(tipoElemento.nome);
            res.json(pokemonsPorTipoElemento);
        } else {
            res.status(404).send('Tipo de elemento não encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/agruparPokemonsPorTipoElemento', async (req, res) => {
    try {
        const resultado = await obterTodosPokemonsAgrupadosPorTipoElemento();
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
