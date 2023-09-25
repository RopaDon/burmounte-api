/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `WatchlistSymbol` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Subscriptions` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `WatchlistSymbol_symbol_key` ON `WatchlistSymbol`(`symbol`);
