const pokeipsumAPI_URL = "http://localhost:3001/pokeipsum/";

function formatarNomeTipoElemento(tipoElemento) {
    return tipoElemento.charAt(0).toUpperCase() + tipoElemento.slice(1)
}

export async function obterTiposElementos() {
    try {
        const response = await fetch(pokeipsumAPI_URL + 'obterTiposElementos/');

        if (!response.ok) {
            throw new Error('Error in the request to the Poké Ipsum API: ' + response.status);
        }

        const data = await response.json();
        const tiposElementos = [{ id: 0, name: 'All types' }];

        data.tiposElementos.forEach((tipoElemento, index) => {
            tiposElementos.push({ id: index + 1, name: formatarNomeTipoElemento(tipoElemento.nome) });
        });

        return tiposElementos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function formatarNomeGeracao(geracao) {
    return "Generation " + geracao.split('-').pop().toUpperCase();
}

export async function obterGeracoes() {
    try {
        const response = await fetch(pokeipsumAPI_URL + 'obterGeracoes/');

        if (!response.ok) {
            throw new Error('Error in the request to the Poké Ipsum API: ' + response.status);
        }

        const data = await response.json();
        const geracoesFormatadas = [{ id: 0, name: 'All Generations' }];

        data.geracoes.forEach((geracao, index) => {
            geracoesFormatadas.push({ id: index + 1, name: formatarNomeGeracao(geracao.nome) });
        });

        return geracoesFormatadas;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default obterTiposElementos;
