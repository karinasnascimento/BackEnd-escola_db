import { Router } from "express";
import { listarProfessores, criarProfessor, editarProfessor, deletarProfessor } from "../controllers/professorController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: Gerenciamento de professores
 */

/**
 * @swagger
 * /professores:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 */
router.get("/", verificarToken, listarProfessores);

/**
 * @swagger
 * /professores:
 *   post:
 *     summary: Cadastra um novo professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, telefone, especialidade]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Andrade
 *               email:
 *                 type: string
 *                 example: carlos@escola.com
 *               telefone:
 *                 type: string
 *                 example: "11988887777"
 *               especialidade:
 *                 type: string
 *                 example: Matemática
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 *       401:
 *         description: Token não informado ou inválido
 */
router.post("/", verificarToken, criarProfessor);

/**
 * @swagger
 * /professores/{id}:
 *   put:
 *     summary: Atualiza dados de um professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, telefone, especialidade]
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               especialidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *       401:
 *         description: Token não informado ou inválido
 */
router.put("/:id", verificarToken, editarProfessor);

/**
 * @swagger
 * /professores/{id}:
 *   delete:
 *     summary: Remove um professor
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Professor removido com sucesso
 *       404:
 *         description: Professor não encontrado
 *       401:
 *         description: Token não informado ou inválido
 */
router.delete("/:id", verificarToken, deletarProfessor);

export default router;
