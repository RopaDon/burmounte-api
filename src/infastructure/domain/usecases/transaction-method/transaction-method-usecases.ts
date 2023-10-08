import { inject, injectable } from "inversify";
import { TransactionMethod } from "@prisma/client";
import { prisma } from "../../../../core/services/prisma-client";
import { LoggerService } from "../../../../core/services/logger-service";
import ServiceHubExceptionDelegate from "../../../../core/exceptions/handler";
import { GetTransactionMethodsDTO } from "../../dtos/request/transaction-method/get-transaction-method-dto";

@injectable()
export default class TransactionMethodsUseCases {
  private logger: LoggerService;
  constructor() {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async getTransactionMethods(getTransactionMethodsDTO: GetTransactionMethodsDTO): Promise<TransactionMethod[]> {
    const { type: identifier } = getTransactionMethodsDTO;
    try {
      const transactionMethods = await prisma.transactionMethod.findMany({
        where: {
          acceptedTransactions: {
            some: {
              acceptedTransaction: {
                identifier, // Filter by the identifier
              },
            },
          },
        },
        include: {
          acceptedTransactions: {
            select: {
              acceptedTransaction: {
                select: {
                  id: true,
                  name: true,
                  identifier: true,
                },
              },
            },
          },
        },
      });

      return transactionMethods;
    } catch (error) {
      throw ServiceHubExceptionDelegate(error, this.logger);
    }
  }
}
