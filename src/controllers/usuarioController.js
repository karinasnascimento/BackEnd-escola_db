import conexao from "../config/db.js";
import * as usuarioModel from "../models/usuarioModel.js";
import bcrypt from "bcrypt";

export const listarUsuarios = async (req, res) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [usuarios] = await conn.query("SELECT id, nome, email, perfil, criado_em FROM usuarios");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar usuários", erro: error.message });
    } finally {
        if (conn) conn.release();
    }
};

export const criarUsuario = async (req, res) => {
    let conn;
    try {
        const { nome, email, senha, perfil } = req.body;

        if (!nome || !email || !senha || !perfil) {
            return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCripto = await bcrypt.hash(senha, salt);

        conn = await conexao.getConnection();
        
        const [existente] = await conn.query("SELECT id FROM usuarios WHERE email = ?", [email]);
        if (existente.length > 0) {
            return res.status(400).json({ mensagem: "Email já cadastrado" });
        }

        const [result] = await conn.query(
            "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
            [nome, email, senhaCripto, perfil]
        );

        res.status(201).json({ 
            id: result.insertId, 
            mensagem: "Usuário criado com sucesso" 
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar usuário", erro: error.message });
    } finally {
        if (conn) conn.release();
    }
};

export const editarUsuario = async (req, res) => {
    let conn;
    try {
        const { nome, email, perfil } = req.body;
        const { id } = req.params;

        conn = await conexao.getConnection();
        await conn.query(
            "UPDATE usuarios SET nome = ?, email = ?, perfil = ? WHERE id = ?",
            [nome, email, perfil, id]
        );

        res.status(200).json({ msg: "Usuário atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao editar usuário", erro: error.message });
    } finally {
        if (conn) conn.release();
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        
        const linhasAfetadas = await usuarioModel.deletarUsuario(id);

        if (linhasAfetadas === 0) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        res.status(200).json({ msg: "Usuário removido com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro interno ao deletar usuário." });
    }
};