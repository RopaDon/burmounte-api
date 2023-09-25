/*
  Warnings:

  - You are about to drop the `TransactionMethods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `AcceptedTransaction` DROP FOREIGN KEY `AcceptedTransaction_transactionMethodsId_fkey`;

-- DropForeignKey
ALTER TABLE `DepositRequest` DROP FOREIGN KEY `DepositRequest_transactionMethodId_fkey`;

-- DropForeignKey
ALTER TABLE `WithdrawalRequest` DROP FOREIGN KEY `WithdrawalRequest_transactionMethodId_fkey`;

-- DropTable
DROP TABLE `TransactionMethods`;

-- DropTable
DROP TABLE `Users`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `notificationToken` VARCHAR(191) NULL,
    `stripeCustomerId` VARCHAR(191) NULL,
    `derivUserId` INTEGER NULL,
    `fullName` VARCHAR(191) NULL,
    `preferredLanguage` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `profilePicture` VARCHAR(191) NULL,
    `accountType` VARCHAR(191) NULL,
    `accountCategory` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionMethod` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `depositActionUrl` VARCHAR(191) NULL,
    `withdrawActionUrl` VARCHAR(191) NULL,
    `transferActionUrl` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `commission` INTEGER NOT NULL,
    `restrictions` VARCHAR(191) NULL,
    `estimatedTime` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AcceptedTransaction` ADD CONSTRAINT `AcceptedTransaction_transactionMethodsId_fkey` FOREIGN KEY (`transactionMethodsId`) REFERENCES `TransactionMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DepositRequest` ADD CONSTRAINT `DepositRequest_transactionMethodId_fkey` FOREIGN KEY (`transactionMethodId`) REFERENCES `TransactionMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WithdrawalRequest` ADD CONSTRAINT `WithdrawalRequest_transactionMethodId_fkey` FOREIGN KEY (`transactionMethodId`) REFERENCES `TransactionMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
