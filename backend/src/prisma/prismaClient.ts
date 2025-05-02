// Aqui fica a instância do prisma pra "conversar" com o BD

import { PrismaClient, Prisma } from "@prisma/client";

export const prisma_client = new PrismaClient();
export const PrismaError = Prisma;
