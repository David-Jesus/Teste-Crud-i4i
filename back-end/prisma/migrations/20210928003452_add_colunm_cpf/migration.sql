/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");
