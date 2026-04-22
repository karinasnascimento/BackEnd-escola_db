import { Router } from "express";

import { criarUsuario, listarUsuarios } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verificarToken, listarUsuarios);
router.post("/", verificarToken, criarUsuario);

export default router;