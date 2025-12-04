import axios from "axios";

const buscarRepresentanteAlunosId = async (id : any) => {
    try {
        const response = await axios.get(`http://192.168.0.107:8080/api/v1/aplicacao/buscarporid/${id}`);
        return response.data;
    } catch(error) {
        throw error;
    }
}

const informacaoAluno = async(alunoId : any, dataCadastro : any) => {
    try {
        const params = dataCadastro ? { dataCadastro } : {};
        const response = await axios.get(`http://192.168.0.107:8080/api/v1/informacaogeral/aplicacao/listarinformacoes/${alunoId}`, 
            { params });
     
            return response.data;
    } catch(error) {
        throw error;
    }
}

export { buscarRepresentanteAlunosId, informacaoAluno };

