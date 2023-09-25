-- CreateTable
CREATE TABLE `TransactionMethods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actionUrl` VARCHAR(191) NOT NULL,
    `acceptedTransactions` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `commission` INTEGER NOT NULL,
    `restrictions` VARCHAR(191) NULL,
    `modifiedOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
