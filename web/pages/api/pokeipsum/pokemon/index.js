import { obterTodosOsPokemons } from '../../../../services/pokemonService';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const pokemons = await obterTodosOsPokemons();
            res.status(200).json(pokemons);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
