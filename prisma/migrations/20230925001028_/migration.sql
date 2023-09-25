-- AlterTable
ALTER TABLE `User` MODIFY `notificationToken` LONGTEXT NULL;

-- AddForeignKey
ALTER TABLE `TrendingSymbol` ADD CONSTRAINT `TrendingSymbol_symbol_fkey` FOREIGN KEY (`symbol`) REFERENCES `ActiveSymbols`(`symbol`) ON DELETE RESTRICT ON UPDATE CASCADE;
