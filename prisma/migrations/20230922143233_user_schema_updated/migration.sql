/*
  Warnings:

  - Added the required column `derivUserId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `derivUserId` INTEGER NOT NULL,
    MODIFY `notificationToken` VARCHAR(191) NULL,
    MODIFY `stripeCustomerId` VARCHAR(191) NULL;
