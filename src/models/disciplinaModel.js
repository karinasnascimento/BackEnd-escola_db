import conexao from "../config/db.js";

export async function listarDisciplinas() {
    const [resultado] = await conexao.query(
        "SELECT id, nome, carga_horaria FROM disciplinas ORDER BY id DESC"
    );
    return resultado;
}

export async function criarDisciplina({ nome, carga_horaria }) {
    const [resultado] = await conexao.query(
        "INSERT INTO disciplinas (nome, carga_horaria) VALUES (?, ?)",
        [nome, carga_horaria]
    );
    return resultado.insertId;
}

export async function editarDisciplina({ nome, carga_horaria, id }) {
    const [resultado] = await conexao.query(
        "UPDATE disciplinas SET nome=?, carga_horaria=? WHERE id = ?",
        [nome, carga_horaria, id]
    );
    return resultado.affectedRows;
}

export async function deletarDisciplina(id) {
    const [resultado] = await conexao.query(
        "DELETE FROM disciplinas WHERE id = ?",
        [id]
    );
    return resultado.affectedRows;
}