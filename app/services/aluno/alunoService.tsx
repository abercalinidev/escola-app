import axios from "axios";

const salvarAluno = async (aluno : any) => {
    try {
        const response = await axios.post(`http://192.168.0.107:8080/api/v1/alunos/salvar`, aluno);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const listarAlunos = async () => {
    try {
        const response = await axios.get(`http://192.168.0.107:8080/api/v1/alunos/listar`);
        return response.data;
    }catch(error) {
        throw error;
    }
}

const inativarAluno = async (id : any) => {
    try {
        await axios.put(`http://192.168.0.107:8080/api/v1/alunos/inativar/${id}`);
    }catch(error) {
        throw error;
    }
}

const ativarAluno = async (id : any) => {
    try {
        await axios.put(`http://192.168.0.107:8080/api/v1/alunos/ativar/${id}`);
    }catch(error) {
        throw error;
    }
}

export { ativarAluno, inativarAluno, listarAlunos, salvarAluno };

