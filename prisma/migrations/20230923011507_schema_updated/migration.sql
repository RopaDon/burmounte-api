/*
  Warnings:

  - You are about to drop the column `transactionMethodsId` on the `AcceptedTransaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `AcceptedTransaction` DROP FOREIGN KEY `AcceptedTransaction_transactionMethodsId_fkey`;

-- AlterTable
ALTER TABLE `AcceptedTransaction` DROP COLUMN `transactionMethodsId`;

-- AlterTable
ALTER TABLE `TransactionMethod` ADD COLUMN `hasUrlAction` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `_AcceptedTransactionToTransactionMethod` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AcceptedTransactionToTransactionMethod_AB_unique`(`A`, `B`),
    INDEX `_AcceptedTransactionToTransactionMethod_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AcceptedTransactionToTransactionMethod` ADD CONSTRAINT `_AcceptedTransactionToTransactionMethod_A_fkey` FOREIGN KEY (`A`) REFERENCES `AcceptedTransaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AcceptedTransactionToTransactionMethod` ADD CONSTRAINT `_AcceptedTransactionToTransactionMethod_B_fkey` FOREIGN KEY (`B`) REFERENCES `TransactionMethod`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
