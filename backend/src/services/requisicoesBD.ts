// Aqui fica a consulta e resposta do banco de dados para as requisições

import { prisma } from "../prisma/prismaClient";
import { Usuario } from "../model/usuario";
import bcrypt from "bcrypt";

export async function cadastrar(nome: string, email: string, senha: string) {
  const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
  
  if (usuarioExistente) {
    throw new Error("Email já cadastrado.");
  }

  const senhaHash = await bcrypt.hash(senha,10);

  const usuario = await prisma.usuario.create({
    data: { nome, email, senha: senhaHash},
  });

  return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha);
}

export async function logar(email: string, senha: string) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  
  if (!usuario) {
    throw new Error("Email não encontrado.");
  }

  const senhaOk = await bcrypt.compare(senha, usuario.senha);
  
  if (!senhaOk) {
    throw new Error("Senha incorreta.");
  }

  return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha);
}