import { Router } from "express";
import { listarAlunos, criarAluno, editarAluno, deletarAluno } from "../controllers/alunoController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos (com nome da turma via LEFT JOIN)
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 *       401:
 *         description: Token não informado ou inválido
 */
router.get("/", verificarToken, listarAlunos);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Cadastra um novo aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, cpf]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria Oliveira
 *               cpf:
 *                 type: string
 *                 example: "123.456.789-00"
 *               email:
 *                 type: string
 *                 example: maria@escola.com
 *               telefone:
 *                 type: string
 *                 example: "11999999999"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "2010-05-20"
 *               turma_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Token não informado ou inválido
 */
router.post("/", verificarToken, criarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza os dados de um aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               turma_id:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Token não informado ou inválido
 */
router.put("/:id", verificarToken, editarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Remove um aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Token não informado ou inválido
 */
router.delete("/:id", verificarToken, deletarAluno);

export default router;
