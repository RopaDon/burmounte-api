/*
  Warnings:

  - You are about to drop the `DepositRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WithdrawalRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `DepositRequest` DROP FOREIGN KEY `DepositRequest_transactionMethodId_fkey`;

-- DropForeignKey
ALTER TABLE `WithdrawalRequest` DROP FOREIGN KEY `WithdrawalRequest_transactionMethodId_fkey`;

-- DropTable
DROP TABLE `DepositRequest`;

-- DropTable
DROP TABLE `WithdrawalRequest`;

-- CreateTable
CREATE TABLE `Deposit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `transactionMethodId` INTEGER NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Withdrawal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `transactionMethodId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Deposit` ADD CONSTRAINT `Deposit_transactionMethodId_fkey` FOREIGN KEY (`transactionMethodId`) REFERENCES `TransactionMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Withdrawal` ADD CONSTRAINT `Withdrawal_transactionMethodId_fkey` FOREIGN KEY (`transactionMethodId`) REFERENCES `TransactionMethod`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
