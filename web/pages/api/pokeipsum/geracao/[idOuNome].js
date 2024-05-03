import { obterPokemonsPorIdDaGeracao, obterPokemonsPorNomeDaGeracao } from '../../../../services/geracaoService';

export default async function handler(req, res) {
    const { idOuNome } = req.query;

    if (req.method === 'GET') {
        try {
            const data = isNaN(parseInt(idOuNome))
                ? await obterPokemonsPorNomeDaGeracao(idOuNome)
                : await obterPokemonsPorIdDaGeracao(parseInt(idOuNome));

            if (data && data.pokemonsPorGeracao) {
                res.status(200).json(data.pokemonsPorGeracao);
            } else {
                res.status(404).json({ error: 'Geração não encontrada ou sem Pokémon' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
