import { injectable } from "inversify";
import { snakeToCamel } from "../utils";
import { derivAPI } from "./deriv-api-connection";
//@ts-ignore
import DerivAPI from "@deriv/deriv-api/dist/DerivAPI";

@injectable()
export default class DerivService {
  private derivAPI: DerivAPI;
  constructor() {
    this.derivAPI = derivAPI.getAPI().basic;
  }

  public async authorize(token: string): Promise<any> {
    let user = await this.derivAPI.authorize(token);

    const mappedUser = snakeToCamel(user);

    return mappedUser;
  }

  public async getActiveSymbols(type: string): Promise<any[]> {
    let allSymbols = await this.derivAPI.activeSymbols({ active_symbols: type });

    const activeSymbols = allSymbols.active_symbols.map((item: any) => snakeToCamel(item));

    return activeSymbols;
  }
}
