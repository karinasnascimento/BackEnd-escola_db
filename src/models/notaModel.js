import conexao from "../config/db.js";

export async function listarNotas() {
    try {
        const [resultado] = await conexao.query(`
            SELECT n.*, a.nome AS aluno_nome, d.nome AS disciplina_nome 
            FROM notas n
            INNER JOIN alunos a ON n.aluno_id = a.id
            INNER JOIN disciplinas d ON n.disciplina_id = d.id
            ORDER BY n.id DESC
        `);
        return resultado;
    } catch (error) {
        throw new Error("Erro ao buscar notas: " + error.message);
    }
}

export async function criarNota({ aluno_id, disciplina_id, nota, bimestre, observacao }) {
    try {
        const query = `
            INSERT INTO notas (aluno_id, disciplina_id, nota, bimestre, observacao) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [resultado] = await conexao.query(query, [aluno_id, disciplina_id, nota, bimestre, observacao]);
        return resultado.insertId;
    } catch (error) {
        throw new Error("Erro ao inserir nota: " + error.message);
    }
}

export async function editarNota(id, { nota, bimestre, observacao }) {
    try {
        const query = `
            UPDATE notas SET nota=?, bimestre=?, observacao=? 
            WHERE id=?
        `;
        const [resultado] = await conexao.query(query, [nota, bimestre, observacao, id]);
        return resultado.affectedRows;
    } catch (error) {
        throw new Error("Erro ao atualizar nota: " + error.message);
    }
}

export async function deletarNota(id) {
    try {
        const [resultado] = await conexao.query("DELETE FROM notas WHERE id = ?", [id]);
        return resultado.affectedRows;
    } catch (error) {
        throw new Error("Erro ao deletar nota: " + error.message);
    }
}

export async function calcularMedia() {
    try {
        const [resultado] = await conexao.query(`
            SELECT 
                a.nome AS aluno,
                d.nome AS disciplina,
                AVG(n.nota) AS media
            FROM notas n
            INNER JOIN alunos a ON n.aluno_id = a.id
            INNER JOIN disciplinas d ON n.disciplina_id = d.id
            GROUP BY a.id, d.id
        `);

        return resultado;
    } catch (error) {
        throw new Error("Erro ao calcular média: " + error.message);
    }
}