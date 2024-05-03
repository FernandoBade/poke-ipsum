import { obterTipoElementoPorId, obterTipoElementoPorNome } from '../../../../services/tipoElementoService';

export default async function handler(req, res) {
    const { idOuNome } = req.query;

    if (req.method === 'GET') {
        try {
            const tipoElemento = isNaN(parseInt(idOuNome))
                ? await obterTipoElementoPorNome(idOuNome)
                : await obterTipoElementoPorId(parseInt(idOuNome));

            if (tipoElemento) {
                res.status(200).json(tipoElemento);
            } else {
                res.status(404).json({ error: 'Tipo de elemento não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
