/*
  Warnings:

  - You are about to drop the `ActiveSymbols` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TrendingSymbol` DROP FOREIGN KEY `TrendingSymbol_symbol_fkey`;

-- DropForeignKey
ALTER TABLE `WatchlistSymbol` DROP FOREIGN KEY `WatchlistSymbol_symbol_fkey`;

-- DropTable
DROP TABLE `ActiveSymbols`;

-- CreateTable
CREATE TABLE `ActiveSymbol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `allowForwardStarting` BOOLEAN NULL,
    `delayAmount` INTEGER NULL,
    `displayName` VARCHAR(191) NULL,
    `exchangeIsOpen` BOOLEAN NULL,
    `exchangeName` VARCHAR(191) NULL,
    `intradayIntervalMinutes` INTEGER NULL,
    `isTradingSuspended` BOOLEAN NULL,
    `market` VARCHAR(191) NOT NULL,
    `marketDisplayName` VARCHAR(191) NULL,
    `pip` DOUBLE NULL,
    `quotedCurrencySymbol` VARCHAR(191) NULL,
    `spot` DOUBLE NULL,
    `spotAge` VARCHAR(191) NULL,
    `spotTime` DATETIME(3) NULL,
    `submarket` VARCHAR(191) NULL,
    `submarketDisplayName` VARCHAR(191) NULL,
    `readableName` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `symbolType` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ActiveSymbol_symbol_key`(`symbol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WatchlistSymbol` ADD CONSTRAINT `WatchlistSymbol_symbol_fkey` FOREIGN KEY (`symbol`) REFERENCES `ActiveSymbol`(`symbol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrendingSymbol` ADD CONSTRAINT `TrendingSymbol_symbol_fkey` FOREIGN KEY (`symbol`) REFERENCES `ActiveSymbol`(`symbol`) ON DELETE RESTRICT ON UPDATE CASCADE;
