const pokeIpsum_URL = "http://localhost:3001/";

function formatarNomeTipoElemento(tipoElemento) {
    return tipoElemento.charAt(0).toUpperCase() + tipoElemento.slice(1)
}

function formatarNomeGeracao(geracao) {
    return "Generation " + geracao.split('-').pop().toUpperCase();
}


// // chamadaa para a versãod do servidor_dotnetcore
// export async function obterTiposElementos() {
//     try {
//         const response = await fetch(`${pokeIpsum_URL}pokeipsum/obterTiposElementos/`);

//         if (!response.ok) {
//             throw new Error('Error in the request to the Poké Ipsum API: ' + response.status);
//         }

//         const data = await response.json();
//         const tiposElementos = [{ id: 0, name: 'All types' }];

//         data.tiposElementos.forEach((tipoElemento, index) => {
//             tiposElementos.push({ id: index + 1, name: formatarNomeTipoElemento(tipoElemento.nome) });
//         });

//         return tiposElementos;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

// // chamadaa para a versãod do servidor_dotnetcore
// export async function obterGeracoes() {
//     try {
//         const response = await fetch(`${pokeIpsum_URL}pokeipsum/obterGeracoes/`);

//         if (!response.ok) {
//             throw new Error('Error in the request to the Poké Ipsum API: ' + response.status);
//         }

//         const data = await response.json();
//         const geracoesFormatadas = [{ id: 0, name: 'All Generations' }];

//         data.geracoes.forEach((geracao, index) => {
//             geracoesFormatadas.push({ id: index + 1, name: formatarNomeGeracao(geracao.nome) });
//         });

//         return geracoesFormatadas;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

export async function obterTiposElementos() {
    try {
        const response = await fetch(`${pokeIpsum_URL}pokeipsum/tipoelemento/`);
        if (!response.ok) {
            throw new Error('Error in the request to the Poké Ipsum API: ' + response.status);
        }

        const data = await response.json();
        const tiposElementos = [{ id: 0, name: 'All types' }];

        data.forEach((tipoElemento, index) => {
            tiposElementos.push({ id: index + 1, name: formatarNomeTipoElemento(tipoElemento.nome) });
        });

        const [allTypes, ...rest] = tiposElementos;
        const sortedElementos = [allTypes, ...rest.sort((a, b) => a.name.localeCompare(b.name))];
        console.log(sortedElementos);

        return sortedElementos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function obterGeracoes() {
    try {
        const response = await fetch(`${pokeIpsum_URL}pokeipsum/geracao/`);
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
    const parametrosURL = new URLSearchParams(opcoesUsuario).toString();
    console.log(parametrosURL);
    return parametrosURL;
}

export async function realizarRequisicao(opcoesUsuario) {
    try {
        const response = await fetch(`${pokeIpsum_URL}gerador/pokeipsum/?${opcoesUsuario}`);

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
