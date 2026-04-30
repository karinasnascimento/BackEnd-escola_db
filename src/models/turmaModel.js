import conexao from "../config/db.js";

export async function listarTurmas() {
    try {
        const [resultado] = await conexao.query(`
            SELECT t.id, t.nome, t.ano_letivo, p.nome AS professor_nome 
            FROM turmas t
            LEFT JOIN professores p ON t.professor_id = p.id
            ORDER BY t.id DESC
        `);
        return resultado;
    } catch (error) {
        throw new Error("Erro ao buscar turmas no banco: " + error.message);
    }
}

export async function criarTurma({ nome, ano_letivo, professor_id }) {
    try {
        const [resultado] = await conexao.query(
            "INSERT INTO turmas (nome, ano_letivo, professor_id) VALUES (?, ?, ?)",
            [nome, ano_letivo, professor_id]
        );
        return resultado.insertId;
    } catch (error) {
        throw new Error("Erro ao inserir turma: " + error.message);
    }
}

export async function editarTurma({ nome, ano_letivo, professor_id, id }) {
    try {
        const [resultado] = await conexao.query(
            "UPDATE turmas SET nome=?, ano_letivo=?, professor_id=? WHERE id=?",
            [nome, ano_letivo, professor_id, id]
        );
        return resultado.affectedRows;
    } catch (error) {
        throw new Error("Erro ao atualizar turma: " + error.message);
    }
}

export async function deletarTurma(id) {
    try {
        const [resultado] = await conexao.query(
            "DELETE FROM turmas WHERE id = ?",
            [id]
        );
        return resultado.affectedRows;
    } catch (error) {
        throw new Error("Erro ao deletar turma: " + error.message);
    }
}