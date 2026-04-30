import conexao from "../config/db.js";

export const listarDisciplinas = async (req, res) => {
    let conn;
    try {
        conn = await conexao.getConnection();
        const [rows] = await conn.query("SELECT * FROM disciplinas");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar disciplinas", erro: error.message });
    } finally {
        if (conn) conn.release();
    }
};

export const criarDisciplina = async (req, res) => {
    let conn;
    try {
        const { nome, carga_horaria } = req.body;
        conn = await conexao.getConnection();
        const [result] = await conn.query(
            "INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)",
            [nome, carga_horaria]
        );
        
        res.status(201).json({ id: result.insertId, nome, carga_horaria });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (conn) conn.release();
    }
};

export const editarDisciplina = async (req, res) => {
    let conn;
    try {
        const { nome, carga_horaria } = req.body;
        const { id } = req.params;
        conn = await conexao.getConnection();
        const [result] = await conn.query(
            "UPDATE disciplinas SET nome = ?, carga_horaria = ? WHERE id = ?",
            [nome, carga_horaria, id]
        );
        res.status(200).json({ msg: "Disciplina atualizada com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao editar disciplina", erro: error.message });
    } finally {
        if (conn) conn.release();
    }
};

export const deletarDisciplina = async (req, res) => {
    let conn;
    try {
        const { id } = req.params;
        conn = await conexao.getConnection();
        const [result] = await conn.query("DELETE FROM disciplinas WHERE id = ?", [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Disciplina não encontrada." });
        }
        res.status(200).json({ msg: "Disciplina removida com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro interno ao deletar disciplina." });
    } finally {
        if (conn) conn.release();
    }
};