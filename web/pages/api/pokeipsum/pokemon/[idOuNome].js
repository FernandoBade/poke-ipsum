import { obterPokemonPorId, obterPokemonPorNome } from '../../../../services/pokemonService';

export default async function handler(req, res) {
    const { idOuNome } = req.query;

    if (req.method === 'GET') {
        try {
            const pokemon = isNaN(parseInt(idOuNome))
                ? await obterPokemonPorNome(idOuNome)
                : await obterPokemonPorId(parseInt(idOuNome));

            if (pokemon) {
                res.status(200).json(pokemon);
            } else {
                res.status(404).json({ error: 'Pokemon not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
