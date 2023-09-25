/*
  Warnings:

  - Added the required column `identifier` to the `AcceptedTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AcceptedTransaction` ADD COLUMN `identifier` VARCHAR(191) NOT NULL;
