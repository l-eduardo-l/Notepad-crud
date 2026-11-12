import "dotenv/config";

// importa o adptador que conecta o Prisma ao SQLite.
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// importa o prisma Client 
import { PrismaClient } from "../generated/prisma/client";

// pega o endereço do Banco de Dados. 
const connectionString = `${process.env.DATABASE_URL}`;

// Cria o adaptador utilizando o endereço do banco  
const adapter = new PrismaBetterSqlite3({ url: connectionString });

// inicia o prisma Client junto com o adaptador 
const prisma = new PrismaClient({ adapter });


// Exporta a conexão para usar em outros arquivos. 
export { prisma };
