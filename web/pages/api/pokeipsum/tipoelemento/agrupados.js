import { obterTodosPokemonsAgrupadosPorTipoElemento } from '../../../../services/tipoElementoService';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const pokemonsAgrupados = await obterTodosPokemonsAgrupadosPorTipoElemento();
            res.status(200).json(pokemonsAgrupados);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
