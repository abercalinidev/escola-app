import axios from "axios";

const salvarRepresentante = async (representante : any) => {
    try {
        const reponse = await axios.post(`http://192.168.0.107:8080/api/v1/representante/salvar`, representante);
        return reponse.data;
    } catch(error) {
        throw error;
    }
}

const listarRepresentantes = async () => {
    try {
        const reponse = await axios.get(`http://192.168.0.107:8080/api/v1/representante/listar`);
        return reponse.data;
    } catch(error) {
        throw error;
    }
}

const inativarRepresentante = async (represetanteId : any) => {
    try {
        await axios.put(`http://192.168.0.107:8080/api/v1/representante/inativar/${represetanteId}`);
    } catch(error) {
        throw error;
    }
}

const ativarRepresentante = async (represetanteId : any) => {
    try {
        await axios.put(`http://192.168.0.107:8080/api/v1/representante/ativar/${represetanteId}`);
    } catch(error) {
        throw error;
    }
}


export { ativarRepresentante, inativarRepresentante, listarRepresentantes, salvarRepresentante };

