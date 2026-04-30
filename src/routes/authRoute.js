import { Router } from "express";
import { login, registrar } from "../controllers/authController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Registro e login de usuários
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@escola.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *               perfil:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 */
router.post("/registrar", registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@escola.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 */
router.post("/login", login);

export default router;
