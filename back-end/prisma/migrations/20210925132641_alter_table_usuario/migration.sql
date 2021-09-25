/*
  Warnings:

  - You are about to drop the column `cargo` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `data_nascimento` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `data_criacao` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cargo",
DROP COLUMN "data_nascimento",
DROP COLUMN "nome",
DROP COLUMN "telefone",
ADD COLUMN     "data_criacao" DATE NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL;
