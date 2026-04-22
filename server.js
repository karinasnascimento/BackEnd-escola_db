import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import authRoute from "./src/routes/authRoute.js"
import usuarioRoute from "./src/routes/usuarioRoute.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://sistema-de-escola.vercel.app"
    ],
    methods:[
        "GET", "POST", "PUT", "DELETE"
    ],
    allowedHeaders:[
        "Content-Type", "Authorization", "ngrok-skip-browser-warning"
    ]
}));

app.get("/",(req,res)=>{
    res.status(200).json({msg: "Api funcionando"})
})

app.get("/teste", (req,res)=>{
    res.status(200).json({ok: true})
})

app.use("/auth", authRoute);
app.use("/usuarios", usuarioRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando http://localhost:${process.env.PORT}`);
})

