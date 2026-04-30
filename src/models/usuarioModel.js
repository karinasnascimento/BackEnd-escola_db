import conexao from "../config/db.js";

export async function listarUsuarios() {
    const [resultado] = await conexao.query(
        "SELECT id, nome, email, perfil, criado_em FROM usuarios ORDER BY id DESC"
    );
    return resultado;
}

export async function criarUsuario({ nome, email, senha, perfil }) {
    const [resultado] = await conexao.query(
        "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
        [nome, email, senha, perfil]
    );
    return resultado.insertId;
}

export async function deletarUsuario(id) {
    const [resultado] = await conexao.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );
    return resultado.affectedRows;
}

export async function atualizarUsuario({ nome, email, perfil, id }) {
    const [resultado] = await conexao.query(
        "UPDATE usuarios SET nome=?, email=?, perfil=? WHERE id = ?",
        [nome, email, perfil, id]
    );
    return resultado.affectedRows;
}
