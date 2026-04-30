import request from 'supertest';
import app from '../app.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Testes da API de Disciplinas', () => {
    let disciplinaId;
    let token;

    beforeAll(async () => {
        const emailAdmin = `admin_disc_${Date.now()}@teste.com`;
        await request(app).post('/auth/registrar').send({
            nome: "Admin Disciplina", 
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

    test('POST /disciplinas deve criar uma nova disciplina', async () => {
        const novaDisciplina = {
            nome: "Programação Back-End",
            carga_horaria: 80
        };

        const response = await request(app)
            .post('/disciplinas')
            .set('Authorization', `Bearer ${token}`)
            .send(novaDisciplina);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        
        disciplinaId = response.body.id;
    });

    test('GET /disciplinas deve retornar a lista de disciplinas', async () => {
        const response = await request(app)
            .get('/disciplinas')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('PUT /disciplinas/:id deve atualizar a disciplina existente', async () => {
        const dadosAtualizados = {
            nome: "Programação Back-End Avançada",
            carga_horaria: 100
        };

        const response = await request(app)
            .put(`/disciplinas/${disciplinaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(dadosAtualizados);

        expect(response.statusCode).toBe(200);
        // Verifica se a mensagem de sucesso existe (independente de ser .msg ou .mensagem)
        const mensagem = response.body.msg || response.body.mensagem;
        expect(mensagem).toBeDefined();
    });

    test('DELETE /disciplinas/:id deve remover a disciplina', async () => {
        await sleep(1000);

        const response = await request(app)
            .delete(`/disciplinas/${disciplinaId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('DELETE /disciplinas/:id deve retornar 404 para ID inexistente', async () => {
        const response = await request(app)
            .delete('/disciplinas/999999')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.statusCode).toBe(404);
    });
});