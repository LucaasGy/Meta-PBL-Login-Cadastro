import z from "zod";

const nomeValido = z.string()
    .min(3, "Nome deve ter ao menos 3 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome não pode conter números ou símbolos");

const emailValido = z.string().email("Email inválido");

const senhaValido = z.string().min(6, "Senha deve ter ao menos 6 caracteres");

export const cadastroValido = z.object({
  nome: nomeValido,
  email: emailValido,
  senha: senhaValido
});

export const loginValido = z.object({
    email: emailValido
});