// Aqui é só a declaração das rotas (requisições)

import { Router } from "express";
import { cadastrarUsuario, loginUsuario, teste } from "../controllers/requisicoes";

export const router = Router();

router.get("/", teste);
router.post("/cadastro", cadastrarUsuario);
router.post("/login", loginUsuario);