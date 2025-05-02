import z from "zod";
import { cadastroValido, loginValido } from "./zod_validador";

export function validarDadosLogin(email: string, senha: string) {
    try {
        loginValido.parse({ email, senha });
    } catch (err) {
        if (err instanceof z.ZodError) {
            const mensagens = err.errors.map(e => e.message).join(", ");
            throw new Error(`Erro de validação: ${mensagens}`);
        }

        throw new Error("Erro desconhecido de validação.");
    }
}

export function validarDadosCadastro(nome: string, email: string, senha: string) {
    try {
        cadastroValido.parse({ nome, email, senha });
    } catch (err) {
        if (err instanceof z.ZodError) {
            const mensagens = err.errors.map(e => e.message).join(", ");
            throw new Error(`Erro de validação: ${mensagens}`);
        }

        throw new Error("Erro desconhecido de validação.");
    }
}