/*
  Warnings:

  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - Added the required column `notificationToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeCustomerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `token`,
    ADD COLUMN `notificationToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `stripeCustomerId` VARCHAR(191) NOT NULL;
