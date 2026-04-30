import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger.js";

import authRoute from "./routes/authRoute.js";
import usuarioRoute from "./routes/usuarioRoute.js";
import professorRoute from "./routes/professorRoute.js";
import disciplinaRoute from "./routes/disciplinaRoute.js";
import turmaRoute from "./routes/turmaRoute.js";
import alunoRoute from "./routes/alunoRoute.js";
import notaRoute from "./routes/notaRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://sistema-de-escola.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"]
}));

setupSwagger(app);

app.get("/", (req, res) => {
    res.status(200).json({ msg: "API funcionando" });
});

app.get("/teste", (req, res) => {
    res.status(200).json({ ok: true });
});

app.use("/auth", authRoute);
app.use("/usuarios", usuarioRoute);
app.use("/professores", professorRoute);
app.use("/disciplinas", disciplinaRoute);
app.use("/turmas", turmaRoute);
app.use("/alunos", alunoRoute);
app.use("/notas", notaRoute);

export default app;
