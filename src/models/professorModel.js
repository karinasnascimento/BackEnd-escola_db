import conexao from "../config/db.js";

export async function listarProfessores() {
    const [resultado] = await conexao.query(
        "SELECT id, nome, email, telefone, especialidade FROM professores ORDER BY id DESC"
    );
    return resultado;
}

export async function criarProfessor({ nome, email, telefone, especialidade }) {
    const [resultado] = await conexao.query(
        "INSERT INTO professores (nome, email, telefone, especialidade) VALUES (?, ?, ?, ?)",
        [nome, email, telefone, especialidade]
    );
    return resultado.insertId;
}

export async function editarProfessor(id, { nome, email, telefone, especialidade }) {
    const [resultado] = await conexao.query(
        "UPDATE professores SET nome=?, email=?, telefone=?, especialidade=? WHERE id = ?",
        [nome, email, telefone, especialidade, id]
    );
    return resultado.affectedRows;
}

export async function deletarProfessor(id) {
    const [resultado] = await conexao.query(
        "DELETE FROM professores WHERE id = ?",
        [id]
    );
    return resultado.affectedRows;
}