import conexao from "../config/db.js";


export async function buscarPorCpf(cpf) {
    try {
        const [resultado] = await conexao.query("SELECT * FROM alunos WHERE cpf = ?", [cpf]);
        return resultado[0]; // Retorna o primeiro aluno encontrado ou undefined
    } catch (error) {
        throw new Error("Erro ao buscar CPF: " + error.message);
    }
}

export async function listarAlunos() {
    try {
        const [resultado] = await conexao.query(`
            SELECT a.*, t.nome AS turma_nome 
            FROM alunos a
            LEFT JOIN turmas t ON a.turma_id = t.id
            ORDER BY a.nome ASC
        `);
        return resultado;
    } catch (error) {
        throw new Error("Erro ao buscar alunos: " + error.message);
    }
}

export async function criarAluno(dados) {
    try {
        const { nome, cpf, email, telefone, data_nascimento, turma_id } = dados;
        const query = `
            INSERT INTO alunos (nome, cpf, email, telefone, data_nascimento, turma_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [resultado] = await conexao.query(query, [nome, cpf, email, telefone, data_nascimento, turma_id]);
        return resultado.insertId;
    } catch (error) {
        throw new Error("Erro ao inserir aluno: " + error.message);
    }
}

export async function editarAluno(id, dados) {
    try {
        const { nome, cpf, email, telefone, data_nascimento, turma_id, status } = dados;
        const query = `
            UPDATE alunos 
            SET nome=?, cpf=?, email=?, telefone=?, data_nascimento=?, turma_id=?, status=? 
            WHERE id=?
        `;
        const [resultado] = await conexao.query(query, [nome, cpf, email, telefone, data_nascimento, turma_id, status, id]);
        return resultado.affectedRows;
    } catch (error) {
        throw new Error("Erro factory atualizar aluno: " + error.message);
    }
}

export async function deletarAluno(id) {
    try {
        const [resultado] = await conexao.query("DELETE FROM alunos WHERE id = ?", [id]);
        return resultado.affectedRows;
    } catch (error) {
        throw new Error("Erro ao deletar aluno: " + error.message);
    }
}

export default {
    buscarPorCpf,
    listarAlunos,
    criarAluno,
    editarAluno,
    deletarAluno
};