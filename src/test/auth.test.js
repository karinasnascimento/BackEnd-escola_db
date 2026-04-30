import request from 'supertest';
import app from '../app.js';
import conexao from '../config/db.js';

describe('Testes de Autenticação', () => {
    
    beforeAll(async () => {
        await conexao.query("DELETE FROM usuarios WHERE email = ?", ["teste@escola.com"]);
    });

    test('Deve registrar um novo usuário com sucesso', async () => {
        const res = await request(app)
            .post('/auth/registrar')
            .send({
                nome: "Usuário Teste",
                email: "teste@escola.com",
                senha: "123456",
                perfil: "admin"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.mensagem).toBe("Usuário criado com sucesso");
    });

    test('Deve realizar login e retornar um token JWT', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: "teste@escola.com",
                senha: "123456"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.mensagem).toBe("Login realizado com sucesso");
    });

    test('Não deve fazer login com senha incorreta', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: "teste@escola.com",
                senha: "senha_errada"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.mensagem).toBe("Senha inválida");
    });
});

afterAll(async () => {
        await conexao.query("DELETE FROM usuarios WHERE email = ?", ["teste@escola.com"]);
        await conexao.end();
    });