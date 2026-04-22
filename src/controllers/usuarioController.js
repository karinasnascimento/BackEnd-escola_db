import conexao from "../config/db.js";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req,res)=>{
    let conn;

    try {
        conn = await conexao.getConnection();
        
        const [usuarios] = await conn.query(`
                SELECT id, nome, email, perfil, criado_em FROM usuarios
            `)
        res.json(usuarios);

        
    } catch (error) {
        res.status(500).json({mensagem: "Erro ao listar usuários", erro: error.message})

    } finally {
        if(conn) conn.release();
    }
}

export const criarUsuario = async (req, res) => {
    let conn;

    console.log(req.body);
    try {
        const { nome, email, senha, perfil } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ messagem: "Nome, email e senha são obrigatórios" })
        }

        conn = await conexao.getConnection();

        const [rows] = await conn.query("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (rows.length > 0) {
            return res.status(400).json({ messagem: "Email ja cadastrado" })
        }

        const senhaCriptografa = await bcrypt.hash(senha, 10);

        await conn.query(`INSERT INTO usuarios (nome, email, senha, perfil) 
                        VALUES (?, ?, ?, ?)`, [nome, email, senhaCriptografa, perfil || "admin"])

        res.status(201).json({ mensagem: "Usuário criado com sucesso" });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao registrar",
            erro: error.message
        });
    } finally {
        if (conn) conn.release();
    }
}

export const editarUsuario = async (req, res) => {
    let conn;

    console.log(req.body);
    try {
        const { nome, email, perfil } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ messagem: "Nome e email são obrigatórios" })
        }

        conn = await conexao.getConnection();

        const [rows] = await conn.query("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (rows.length > 0) {
            return res.status(400).json({ messagem: "Email ja cadastrado" })
        }

        await conn.query(`UPDATE usuarios (nome, email, perfil) 
                        VALUES (?, ?, ?)`, [nome, email, perfil || "admin"])

        res.status(201).json({ mensagem: "Usuário editado com sucesso" });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao editar",
            erro: error.message
        });
    } finally {
        if (conn) conn.release();
    }
}