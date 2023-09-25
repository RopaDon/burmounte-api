/*
  Warnings:

  - You are about to drop the column `market` on the `symbols` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `symbols` DROP COLUMN `market`,
    MODIFY `description` TEXT NULL,
    MODIFY `symbol` VARCHAR(191) NOT NULL;
