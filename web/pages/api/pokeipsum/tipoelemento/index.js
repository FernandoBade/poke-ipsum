import { obterListaTiposElementos } from '../../../../services/tipoElementoService';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const listaTipos = await obterListaTiposElementos();
            res.status(200).json(listaTipos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
