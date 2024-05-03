import { obterListaGeracoes } from '../../../../services/geracaoService';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const listaGeracoes = await obterListaGeracoes();
            res.status(200).json(listaGeracoes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
