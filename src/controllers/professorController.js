import conexao from "../config/db.js";
import * as professorModel from "../models/professorModel.js";

export const listarProfessores = async (req, res) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [professores] = await conn.query(`
            SELECT id, nome, email, telefone, especialidade FROM professores
        `);
        res.json(professores);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar professores", erro: error.message });
    } finally {
        if (conn) conn.release();
    }
};

export const criarProfessor = async (req, res) => {
    let conn;
    try {
        const { nome, email, telefone, especialidade } = req.body;

        if (!nome || !email || !telefone || !especialidade) {
            return res.status(400).json({ mensagem: "Nome, email, telefone e especialidade são obrigatórios" });
        }

        conn = await conexao.getConnection();
        const [rows] = await conn.query("SELECT * FROM professores WHERE email = ?", [email]);

        if (rows.length > 0) {
            return res.status(400).json({ mensagem: "Email já cadastrado" });
        }

        const [result] = await conn.query(
            `INSERT INTO professores (nome, email, telefone, especialidade) VALUES (?, ?, ?, ?)`,
            [nome, email, telefone, especialidade]
        );

        res.status(201).json({ 
            id: result.insertId, 
            mensagem: "Professor criado com sucesso" 
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao registrar", erro: error.message });
    } finally {
        if (conn) conn.release();
    }
};

export async function editarProfessor(req, res) {
    try {
        const { nome, email, telefone, especialidade } = req.body;
        const id = req.params.id;

        if (!nome || !email || !telefone || !especialidade) {
            return res.status(400).json({ msg: "Nome, email, telefone e especialidade são obrigatórios" });
        }

        await professorModel.editarProfessor(id, { nome, email, telefone, especialidade });

        res.status(200).json({
            msg: "Professor atualizado com sucesso",
            id
        });
    } catch (error) {
        res.status(500).json({ msg: "Erro interno ao atualizar professor", erro: error.message });
    }
}

export async function deletarProfessor(req, res) {
    try {
        const { id } = req.params;
        const linhasAfetadas = await professorModel.deletarProfessor(id);

        if (linhasAfetadas === 0) {
            return res.status(404).json({ error: "Professor não encontrado." });
        }

        return res.status(200).json({ msg: "Professor removido com sucesso." });
    } catch (error) {
        return res.status(500).json({ error: "Erro interno ao deletar professor." });
    }
}