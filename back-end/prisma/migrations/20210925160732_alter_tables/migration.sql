/*
  Warnings:

  - You are about to drop the column `data_nascimento` on the `Pessoa` table. All the data in the column will be lost.
  - Added the required column `idade` to the `Pessoa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pessoa" DROP COLUMN "data_nascimento",
ADD COLUMN     "idade" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "data_criacao" SET DEFAULT CURRENT_TIMESTAMP;
