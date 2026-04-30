import request from 'supertest';
import app from '../app.js';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Testes da API de Usuários', () => {
    let usuarioId;
    let emailTeste;
    let token;
    const perfilTeste = "Admin";

    beforeAll(async () => {
        const emailAdmin = `admin_master_${Date.now()}@teste.com`;
        
        await request(app).post('/auth/registrar').send({
            nome: "Admin Teste",
            email: emailAdmin,
            senha: "123",
            perfil: "Admin"
        });

        const resLogin = await request(app).post('/auth/login').send({ 
            email: emailAdmin, 
            senha: "123" 
        });
        
        token = resLogin.body.token;
    });

    test('POST /usuarios deve criar um novo utilizador', async () => {
        emailTeste = `user_${Date.now()}@teste.com`;
        
        const novoUsuario = {
            nome: "Utilizador de Teste",
            email: emailTeste,
            senha: "senha123",
            perfil: perfilTeste
        };

        const response = await request(app)
            .post('/usuarios')
            .set('Authorization', `Bearer ${token}`)
            .send(novoUsuario);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        
        usuarioId = response.body.id;
    });

    test('GET /usuarios deve listar todos os utilizadores', async () => {
        const response = await request(app)
            .get('/usuarios')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        
        
        const encontrou = response.body.find(u => u.email === emailTeste);
        expect(encontrou).toBeDefined();
    });

    test('PUT /usuarios/:id deve editar o utilizador', async () => {
        const response = await request(app)
            .put(`/usuarios/${usuarioId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: "Nome Editado",
                email: emailTeste,
                perfil: perfilTeste
            });

        expect(response.statusCode).toBe(200);
        const mensagem = response.body.msg || response.body.mensagem;
        expect(mensagem).toBeDefined();
    });

    test('POST /auth/login deve validar as credenciais do novo utilizador', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: emailTeste,
                senha: "senha123"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    test('DELETE /usuarios/:id deve remover o utilizador', async () => {
        await sleep(1000);
        
        const response = await request(app)
            .delete(`/usuarios/${usuarioId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('DELETE /usuarios/:id deve dar 404 para utilizador inexistente', async () => {
        const response = await request(app)
            .delete('/usuarios/999999')
            .set('Authorization', `Bearer ${token}`);
            
        expect(response.statusCode).toBe(404);
    });
});