import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Header recebido:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não informado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }
};