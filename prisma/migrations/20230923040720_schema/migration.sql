/*
  Warnings:

  - You are about to drop the column `decimal` on the `ActiveSymbols` table. All the data in the column will be lost.
  - Added the required column `decimalValue` to the `ActiveSymbols` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ActiveSymbols` DROP COLUMN `decimal`,
    ADD COLUMN `decimalValue` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `WatchlistSymbol` MODIFY `addedOn` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
