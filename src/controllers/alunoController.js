import * as AlunoModel from "../models/alunoModel.js";

export const listarAlunos = async (req, res) => {
    try {
        const alunos = await AlunoModel.listarAlunos();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar alunos", erro: error.message });
    }
};

export const criarAluno = async (req, res) => {
    try {
        const { nome, cpf, email, telefone, data_nascimento, turma_id } = req.body;

        if (!nome || !cpf) {
            return res.status(400).json({ mensagem: "Nome e CPF são obrigatórios" });
        }

        const id = await AlunoModel.criarAluno({ nome, cpf, email, telefone, data_nascimento, turma_id });
        res.status(201).json({ id, mensagem: "Aluno criado com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar aluno", erro: error.message });
    }
};

export const editarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const linhasAfetadas = await AlunoModel.editarAluno(id, req.body);

        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Aluno não encontrado" });
        }

        res.json({ mensagem: "Dados do aluno atualizados com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar aluno", erro: error.message });
    }
};

export const deletarAluno = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await AlunoModel.deletarAluno(id);

        if (!deletado) {
            return res.status(404).json({ mensagem: "Aluno não encontrado" });
        }

        res.json({ mensagem: "Aluno removido com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao deletar aluno", erro: error.message });
    }
};