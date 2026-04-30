import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function iniciarBanco() {
    try {
        await prisma.$connect();
        console.log("Banco de dados conectado com sucesso!")
    } catch (error) {
        console.error("Falha na conexao com o banco:", error)
        process.exit(1)
    }
    
}

export default  prisma;


