import request from 'supertest';
import app from '../app.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Testes da API de Turmas', () => {
    let turmaId;
    let token;

    beforeAll(async () => {
        const emailAdmin = `admin_turma_${Date.now()}@teste.com`;
        await request(app).post('/auth/registrar').send({
            nome: "Admin Turma",
            email: emailAdmin,
            senha: "123",
            perfil: "admin"
        });

        const res = await request(app).post('/auth/login').send({
            email: emailAdmin,
            senha: "123"
        });
        token = res.body.token;
    });

    test('POST /turmas deve criar uma nova turma', async () => {
        const novaTurma = {
            nome: "Turma A",
            ano_letivo: 2025,
            professor_id: null
        };

        const response = await request(app)
            .post('/turmas')
            .set('Authorization', `Bearer ${token}`)
            .send(novaTurma);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');

        turmaId = response.body.id;
    });

    test('POST /turmas deve retornar erro 400 se faltar campo obrigatório', async () => {
        const response = await request(app)
            .post('/turmas')
            .set('Authorization', `Bearer ${token}`)
            .send({ professor_id: null }); // faltando nome e ano_letivo

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('mensagem');
    });

    test('GET /turmas deve retornar lista de turmas', async () => {
        const response = await request(app)
            .get('/turmas')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /turmas deve incluir nome do professor (LEFT JOIN)', async () => {
        const response = await request(app)
            .get('/turmas')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty('professor_nome');
        }
    });

    test('PUT /turmas/:id deve atualizar a turma', async () => {
        const dadosAtualizados = {
            nome: "Turma A - Atualizada",
            ano_letivo: 2026,
            professor_id: null
        };

        const response = await request(app)
            .put(`/turmas/${turmaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(dadosAtualizados);

        expect(response.statusCode).toBe(200);
        const mensagem = response.body.msg || response.body.mensagem;
        expect(mensagem).toBeDefined();
    });

    test('PUT /turmas/:id deve retornar 404 para ID inexistente', async () => {
        const response = await request(app)
            .put('/turmas/999999')
            .set('Authorization', `Bearer ${token}`)
            .send({ nome: "X", ano_letivo: 2025 });

        expect(response.statusCode).toBe(404);
    });

    test('DELETE /turmas/:id deve remover a turma', async () => {
        await sleep(500);

        const response = await request(app)
            .delete(`/turmas/${turmaId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        const mensagem = response.body.msg || response.body.mensagem;
        expect(mensagem).toBeDefined();
    });

    test('DELETE /turmas/:id deve retornar 404 para ID inexistente', async () => {
        const response = await request(app)
            .delete('/turmas/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(404);
    });

    test('GET /turmas sem token deve retornar 401', async () => {
        const response = await request(app).get('/turmas');
        expect(response.statusCode).toBe(401);
    });
});
