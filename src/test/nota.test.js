import request from 'supertest';
import app from '../app.js';

describe('Testes da API de Notas', () => {
    let token, alunoId, disciplinaId, notaId;

    beforeAll(async () => {
        // 1. Login Admin
        const emailAdmin = `admin_nota_${Date.now()}@teste.com`;
        await request(app).post('/auth/registrar').send({
            nome: "Admin Nota", email: emailAdmin, senha: "123", perfil: "admin"
        });
        const resLogin = await request(app).post('/auth/login').send({ email: emailAdmin, senha: "123" });
        token = resLogin.body.token;

        // 2. Criar Aluno com CPF único
        const resAluno = await request(app)
            .post('/alunos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: "Aluno Teste Nota",
                cpf: `${Date.now()}`.slice(-11).padStart(11, '0')
            });

        if (resAluno.statusCode !== 201) {
            console.log("ERRO AO CRIAR ALUNO NO TESTE:", resAluno.body);
        }
        alunoId = resAluno.body.id;

        // 3. Criar Disciplina
        const resDisc = await request(app)
            .post('/disciplinas')
            .set('Authorization', `Bearer ${token}`)
            .send({ nome: "Disciplina Teste Nota", carga_horaria: 40 });

        if (resDisc.statusCode !== 201) {
            console.log("ERRO AO CRIAR DISCIPLINA NO TESTE:", resDisc.body);
        }
        disciplinaId = resDisc.body.id;

        console.log("DEBUG FINAL - Aluno ID:", alunoId, "Disciplina ID:", disciplinaId);
    });

    test('POST /notas deve lançar uma nota', async () => {
        const response = await request(app)
            .post('/notas')
            .set('Authorization', `Bearer ${token}`)
            .send({ aluno_id: alunoId, disciplina_id: disciplinaId, nota: 8.5, bimestre: "1º Bimestre" });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        notaId = response.body.id;
    });

    test('GET /notas/aluno/:aluno_id deve listar notas do aluno', async () => {
        const response = await request(app)
            .get(`/notas/aluno/${alunoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('PUT /notas/:id deve alterar o valor da nota', async () => {
        const response = await request(app)
            .put(`/notas/${notaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ nota: 9.5, bimestre: "1º Bimestre" });

        expect(response.statusCode).toBe(200);
    });

    test('DELETE /notas/:id deve remover a nota', async () => {
        const response = await request(app)
            .delete(`/notas/${notaId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });
});
