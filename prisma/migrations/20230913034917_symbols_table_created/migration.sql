-- CreateTable
CREATE TABLE `Symbols` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `market` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `decimal` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `submarket` VARCHAR(191) NOT NULL,
    `marketDisplayName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
