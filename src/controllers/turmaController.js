import conexao from "../config/db.js";
import * as turmaModel from "../models/turmaModel.js";

export const listarTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.listarTurmas();
        res.json(turmas);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar turmas", erro: error.message });
    }
};

export const criarTurma = async (req, res) => {
    try {
        const { nome, ano_letivo, professor_id } = req.body;

        if (!nome || !ano_letivo) {
            return res.status(400).json({ mensagem: "Nome e ano letivo são obrigatórios" });
        }

        const idGerado = await turmaModel.criarTurma({ nome, ano_letivo, professor_id });
        res.status(201).json({ mensagem: "Turma criada com sucesso", id: idGerado });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar turma", erro: error.message });
    }
};

export const editarTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, ano_letivo, professor_id } = req.body;

        const linhasAfetadas = await turmaModel.editarTurma({ nome, ano_letivo, professor_id, id });

        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Turma não encontrada" });
        }

        res.status(200).json({ mensagem: "Turma atualizada com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar turma", erro: error.message });
    }
};

export const deletarTurma = async (req, res) => {
    try {
        const { id } = req.params;
        const linhasAfetadas = await turmaModel.deletarTurma(id);

        if (linhasAfetadas === 0) {
            return res.status(404).json({ mensagem: "Turma não encontrada" });
        }

        res.status(200).json({ mensagem: "Turma removida com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao deletar turma", erro: error.message });
    }
};