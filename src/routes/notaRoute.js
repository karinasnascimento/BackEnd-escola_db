import { Router } from 'express';
import { criarNota, listarNotas, editarNota, deletarNota, calcularMedia } from '../controllers/notaController.js';
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Gerenciamento de notas
 */

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Lista todas as notas (com nomes do aluno e disciplina via INNER JOIN)
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 */
router.get('/', verificarToken, listarNotas);

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Lança uma nova nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [aluno_id, disciplina_id, nota, bimestre]
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 example: 1
 *               disciplina_id:
 *                 type: integer
 *                 example: 1
 *               nota:
 *                 type: number
 *                 format: float
 *                 example: 8.5
 *               bimestre:
 *                 type: string
 *                 example: "1º Bimestre"
 *               observacao:
 *                 type: string
 *                 example: "Bom desempenho"
 *     responses:
 *       201:
 *         description: Nota registrada com sucesso
 *       400:
 *         description: Dados obrigatórios faltando
 *       401:
 *         description: Token não informado ou inválido
 */
router.post('/', verificarToken, criarNota);

/**
 * @swagger
 * /notas/aluno/{aluno_id}:
 *   get:
 *     summary: Lista todas as notas de um aluno específico
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: aluno_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 */
router.get('/aluno/:aluno_id', verificarToken, listarNotas);

/**
 * @swagger
 * /notas/aluno/{aluno_id}/media:
 *   get:
 *     summary: Retorna a média das notas por aluno e disciplina
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: aluno_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Médias calculadas com sucesso
 *       401:
 *         description: Token não informado ou inválido
 */
router.get('/aluno/:aluno_id/media', verificarToken, calcularMedia);

/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Atualiza uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *                 format: float
 *               bimestre:
 *                 type: string
 *               observacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       404:
 *         description: Nota não encontrada
 *       401:
 *         description: Token não informado ou inválido
 */
router.put('/:id', verificarToken, editarNota);

/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Remove uma nota
 *     tags: [Notas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da nota
 *     responses:
 *       200:
 *         description: Nota removida com sucesso
 *       404:
 *         description: Nota não encontrada
 *       401:
 *         description: Token não informado ou inválido
 */
router.delete('/:id', verificarToken, deletarNota);

export default router;
