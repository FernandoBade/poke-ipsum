const baseURL = "/api/pokeipsum/";

function formatarNomeTipoElemento(tipoElemento) {
    return tipoElemento.charAt(0).toUpperCase() + tipoElemento.slice(1);
}

function formatarNomeGeracao(geracao) {
    return "Generation " + geracao.split('-').pop().toUpperCase();
}

export async function obterTiposElementos() {
    try {
        const response = await fetch(`${baseURL}tipoelemento/`);
        if (!response.ok) {
            throw new Error('Error in the request to the Poké Ipsum API: ' + response.status);
        }

        const data = await response.json();
        const tiposElementos = [{ id: 0, name: 'All types' }];

        data.forEach((tipoElemento, index) => {
            if (tipoElemento.nome !== "unknown" && tipoElemento.nome !== "stellar" ) {
                tiposElementos.push({ id: index + 1, name: formatarNomeTipoElemento(tipoElemento.nome) });
            }
        });
    
        const [allTypes, ...rest] = tiposElementos;
        const sortedElementos = [allTypes, ...rest.sort((a, b) => a.name.localeCompare(b.name))];

        return sortedElementos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function obterGeracoes() {
    try {
        const response = await fetch(`${baseURL}geracao/`);
        if (!response.ok) {
            throw new Error('Error in the request to the Poké Ipsum API: ' + response.status);
        }

        const data = await response.json();
        const geracoesFormatadas = [{ id: 0, name: 'All Generations' }];

        data.forEach((geracao, index) => {
            geracoesFormatadas.push({ id: index + 1, name: formatarNomeGeracao(geracao.nome) });
        });

        return geracoesFormatadas;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function criarParametrosURL(opcoesUsuario) {
    return new URLSearchParams(opcoesUsuario).toString();
}

export async function realizarRequisicao(opcoesUsuario) {
    try {
        const response = await fetch(`${baseURL}?${opcoesUsuario}`);
        if (!response.ok) {
            throw new Error('Error in the request to the Poké Ipsum API: ' + response.status);
        }

        const data = await response.json();
        return data;
    } catch (erro) {
        console.error(erro);
        throw erro;
    }
}

export default obterTiposElementos;
