/*
  Warnings:

  - Added the required column `nome` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "nome" TEXT NOT NULL;
