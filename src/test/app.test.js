import request from 'supertest';
import app from '../app.js';

import conexao from '../config/db.js';

describe('Testes da API Express', () => {
 
    test('GET / deve retornar status da API', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
             "msg": "API funcionando"
        });
    });

});

// Fecha a conexão com o db após todos os testes terminarem
afterAll(async () => {
    await conexao.end();
});