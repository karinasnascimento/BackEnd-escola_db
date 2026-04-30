import request from 'supertest';
import app from '../app.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Testes da API de Alunos', () => {
    let alunoId;
    let token;
    let cpfTeste;
    const turmaIdFixo = 1;

    beforeAll(async () => {
        const emailAdmin = `admin_${Date.now()}@teste.com`;
        const senhaAdmin = "senha123";

        await request(app).post('/auth/registrar').send({
            nome: "Admin Teste",
            email: emailAdmin,
            senha: senhaAdmin,
            perfil: "Admin"
        });

        // Login
        const response = await request(app).post('/auth/login').send({
            email: emailAdmin,
            senha: senhaAdmin
        });

        token = response.body.token;
        console.log("Autenticado! Token gerado.");
    });

    test('POST /alunos deve criar um aluno corretamente', async () => {
        cpfTeste = `123${Date.now().toString().slice(-8)}`;

        const novoAluno = {
            nome: "Aluno Teste Completo",
            cpf: cpfTeste,
            email: `aluno_${Date.now()}@teste.com`,
            telefone: "11988887777",
            data_nascimento: "2010-05-20",
            turma_id: turmaIdFixo
        };

        const response = await request(app)
            .post('/alunos')
            .set('Authorization', `Bearer ${token}`)
            .send(novoAluno);

        if (response.statusCode !== 201) {
            console.log("Erro no Banco de Dados:", response.body);
        }

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');

        alunoId = response.body.id;
    });

    test('GET /alunos deve retornar listagem com nome_turma (JOIN)', async () => {
        const response = await request(app)
            .get('/alunos')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        if (response.body.length > 0) {
expect(response.body[0]).toHaveProperty('turma_nome');
        }
    });

    test('PUT /alunos/:id deve atualizar os dados', async () => {
        const dadosAtualizados = {
            nome: "Nome do Aluno Alterado",
            cpf: cpfTeste,
            turma_id: turmaIdFixo
        };

        const response = await request(app)
            .put(`/alunos/${alunoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(dadosAtualizados);

        expect(response.statusCode).toBe(200);
        const mensagem = response.body.msg || response.body.mensagem;
        expect(mensagem).toBeDefined();
    });

    test('DELETE /alunos/:id deve remover o aluno', async () => {
        await sleep(1000);

        const response = await request(app)
            .delete(`/alunos/${alunoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        const mensagem = response.body.msg || response.body.mensagem;
        expect(mensagem).toBeDefined();
    });
});