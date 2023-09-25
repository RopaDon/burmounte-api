import "reflect-metadata";
import { Controllers } from "..";
import Routes from "../../routes/routes";
import { inject, injectable } from "inversify";
import { Get, JsonController, Param, QueryParams } from "routing-controllers";
import TransactionMethodsUseCases from "../../../infastructure/domain/usecases/transaction-method/transaction-method-usecases";
import { GetTransactionMethodsDTO } from "../../../infastructure/domain/dtos/request/transaction-method/get-transaction-method-dto";

@injectable()
@JsonController(Controllers.TransactionMethods)
export class TransactionMethodsController {
  constructor(@inject(TransactionMethodsUseCases) private transactionMethodsUseCases: TransactionMethodsUseCases) {}

  @Get(Routes.TransactionMethod.Get)
  async getTransactionMethods(@QueryParams() getTransactionMethodsDTO: GetTransactionMethodsDTO) {
    return await this.transactionMethodsUseCases.getTransactionMethods(getTransactionMethodsDTO);
  }
}
