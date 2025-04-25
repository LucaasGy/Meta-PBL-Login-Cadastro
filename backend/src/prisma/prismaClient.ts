// Aqui fica a instância do prisma pra "conversar" com o BD

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
