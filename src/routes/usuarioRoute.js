import { Router } from "express";

import { criarUsuario, editarUsuario, listarUsuarios } from "../controllers/usuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verificarToken, listarUsuarios);
router.post("/", verificarToken, criarUsuario);
router.put("/:id", verificarToken, editarUsuario);

export default router;