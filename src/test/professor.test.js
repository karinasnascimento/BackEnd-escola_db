import request from 'supertest';
import app from '../app.js';

describe('Testes da API de Professores', () => {
    let professorId;
    let token;

    beforeAll(async () => {
        const emailAdmin = `admin_prof_${Date.now()}@teste.com`;
        await request(app).post('/auth/registrar').send({
            nome: "Admin Prof", email: emailAdmin, senha: "123", perfil: "admin"
        });
        const res = await request(app).post('/auth/login').send({ email: emailAdmin, senha: "123" });
        token = res.body.token;
    });

    test('POST /professores deve criar um professor com todos os campos', async () => {
        const novo = { 
            nome: "Professor Teste",
            email: `prof_${Date.now()}@teste.com`,
            telefone: "11988887777",
            especialidade: "Matemática"
        };

        const res = await request(app)
            .post('/professores')
            .set('Authorization', `Bearer ${token}`)
            .send(novo);
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        professorId = res.body.id;
    });

    test('GET /professores deve listar todos', async () => {
        const res = await request(app).get('/professores').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});