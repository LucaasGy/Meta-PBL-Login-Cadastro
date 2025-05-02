// Aqui fica a consulta e resposta do banco de dados para as requisições

import { prisma_client, PrismaError } from "../prisma/prismaClient";
import { Usuario } from "../model/usuario";
import bcrypt from "bcrypt";

export async function cadastrar(nome: string, email: string, senha: string) {
  const senhaHash = await bcrypt.hash(senha, 10);  
  
  try {
    const usuario = await prisma_client.usuario.create({
      data: { nome, email, senha: senhaHash},
    });

    return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha);

  } catch (err: unknown) {
    if (err instanceof PrismaError.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new Error("Email já cadastrado.");
    }

    if (err instanceof Error){
      throw err;
    }

    throw new Error("Erro desconhecido ao cadastrar usuário.");
  }
}

export async function logar(email: string, senha: string) {
  try {
    const usuario = await prisma_client.usuario.findUnique({ where: { email } });
    
    if (!usuario) {
      throw new Error("Email ou senha inválidos.");
    }

    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    
    if (!senhaOk) {
      throw new Error("Email ou senha inválidos.");
    }

    return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha);

  } catch (err: unknown) {
    if (err instanceof Error){
      throw err;
    }

    throw new Error("Erro desconhecido ao realizar login.");
  }
}