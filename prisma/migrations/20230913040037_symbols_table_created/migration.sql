/*
  Warnings:

  - Added the required column `market` to the `symbols` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `symbols` ADD COLUMN `market` VARCHAR(191) NOT NULL;
