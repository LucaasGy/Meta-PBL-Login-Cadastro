// Aqui fica as funções que serão executadas em cada requisição

import { Request, Response } from "express";
import { cadastrar, logar } from "../services/requisicoesBD";
import jwt from "jsonwebtoken";

export function teste(req: Request, res: Response) {
  res.send("Servidor funcionando! FAZ O L");
}

export async function cadastrarUsuario(req: Request, res: Response) {
  const { nome, email, senha } = req.body;
  
  try {
    const usuario = await cadastrar(nome, email, senha);

    res.status(201).json({ 
      mensagem: "Usuário criado com sucesso", 
      usuario: {id: usuario.getId(), nome: usuario.getNome(), email: usuario.getEmail()}
    });
  } 
  
  catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ erro: err.message });
    }

    else {
      res.status(500).json({ erro: "Erro interno no servidor." });
    }
  }
}

export async function loginUsuario(req: Request, res: Response) {
  const { email, senha } = req.body;
  
  try {
    const usuario = await logar(email, senha);

    // Token -> só contém o ID do usuário
    const token = jwt.sign({ userId: usuario.getId() }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.status(200).json({ 
      mensagem: "Login realizado com sucesso", 
      usuario: {id: usuario.getId(), nome: usuario.getNome(), email: usuario.getEmail()}, 
      token 
    });
  } 
  
  catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ erro: err.message });
    }

    else {
      res.status(500).json({ erro: "Erro interno no servidor." });
    }
  }
}
