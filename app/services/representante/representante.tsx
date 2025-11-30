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

const buscarRepresentantePorId = async (representanteId : any) => {
    try {
        const response = await axios.get(`http://192.168.0.107:8080/api/v1/representante/buscar/${representanteId}`);
        return response.data;
    } catch(error) {
        throw error;
    }
}

const atualizarRepresentante = async (representante: any, representanteId: any) => {
  try {
    const response = await axios.put(
      `http://192.168.0.107:8080/api/v1/representante/editar/${representanteId}`,representante,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log("error 415 =>",  error);
    throw error;
  }
};



export { ativarRepresentante, atualizarRepresentante, buscarRepresentantePorId, inativarRepresentante, listarRepresentantes, salvarRepresentante };

