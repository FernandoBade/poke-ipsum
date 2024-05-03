import axios from 'axios';

async function tratarRespostaAPI(url) {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            if (!response.data) {
                throw new Error('The PokéAPI response returned no data.');
            }
            return response.data;
        } else {
            throw new Error(`Request to the PokéAPI failed. Status: ${response.status}. Message: ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`HTTP Request Failed: ${error.message}`);
    }
}

function extrairNomes(pokemonData) {
    return pokemonData.map(p => p.pokemon ? p.pokemon.name : p.name);
}

export { tratarRespostaAPI, extrairNomes };