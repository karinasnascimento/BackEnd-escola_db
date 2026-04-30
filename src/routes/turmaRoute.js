import { Router } from "express";
import { listarTurmas, criarTurma, editarTurma, deletarTurma } from "../controllers/turmaController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Turmas
 *   description: Gerenciamento de turmas
 */

/**
 * @swagger
 * /turmas:
 *   get:
 *     summary: Lista todas as turmas (com nome do professor via LEFT JOIN)
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 */
router.get("/", verificarToken, listarTurmas);

/**
 * @swagger
 * /turmas:
 *   post:
 *     summary: Cadastra uma nova turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, ano_letivo]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Turma A"
 *               ano_letivo:
 *                 type: integer
 *                 example: 2025
 *               professor_id:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não informado ou inválido
 */
router.post("/", verificarToken, criarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza uma turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               ano_letivo:
 *                 type: integer
 *               professor_id:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso
 *       404:
 *         description: Turma não encontrada
 *       401:
 *         description: Token não informado ou inválido
 */
router.put("/:id", verificarToken, editarTurma);

/**
 * @swagger
 * /turmas/{id}:
 *   delete:
 *     summary: Remove uma turma
 *     tags: [Turmas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da turma
 *     responses:
 *       200:
 *         description: Turma removida com sucesso
 *       404:
 *         description: Turma não encontrada
 *       401:
 *         description: Token não informado ou inválido
 */
router.delete("/:id", verificarToken, deletarTurma);

export default router;
