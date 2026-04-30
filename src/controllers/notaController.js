import conexao from "../config/db.js";
import * as NotaModel from "../models/notaModel.js";

export const listarNotas = async (req, res) => {
    try {
        const notas = await NotaModel.listarNotas();
        res.json(notas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar notas", erro: error.message });
    }
};

export const criarNota = async (req, res) => {
    try {
        const { aluno_id, disciplina_id, nota, bimestre } = req.body;

        if (!aluno_id || !disciplina_id || nota === undefined || !bimestre) {
            return res.status(400).json({ mensagem: "Dados obrigatórios faltando (aluno, disciplina, nota ou bimestre)" });
        }

        const id = await NotaModel.criarNota(req.body);
        res.status(201).json({ mensagem: "Nota registrada com sucesso", id });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao registrar nota", erro: error.message });
    }
};

export const editarNota = async (req, res) => {
    try {
        const { id } = req.params;
        const linhasAfetadas = await NotaModel.editarNota(id, req.body);

        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Nota não encontrada" });
        }

        res.json({ mensagem: "Nota atualizada com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar nota", erro: error.message });
    }
};

export const deletarNota = async (req, res) => {
    try {
        const { id } = req.params;
        const deletado = await NotaModel.deletarNota(id);

        if (!deletado) {
            return res.status(404).json({ mensagem: "Nota não encontrada" });
        }

        res.json({ mensagem: "Nota removida com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao deletar nota", erro: error.message });
    }
};
export const calcularMedia = async (req, res) => {
    try {
        const medias = await NotaModel.calcularMedia();
        res.json(medias);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao calcular média", erro: error.message });
    }
};