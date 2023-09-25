import "reflect-metadata";

import WebSocket from "ws";
import { injectable } from "inversify";
//@ts-ignore
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic.js";

@injectable()
export class DerivAPI {
  private api: DerivAPIBasic | null = null;

  constructor() {}

  public async establishApiConnection(): Promise<DerivAPIBasic> {
    return new Promise<DerivAPIBasic>((resolve, reject) => {
      const connection = new WebSocket(process.env.DERIV_API!);

      connection.addEventListener("open", () => {
        console.log("WebSocket connection established successfully");
        const api = new DerivAPIBasic({ connection });
        resolve(api);
      });

      connection.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
        reject(error);
      });
    });
  }
  public getApi(): DerivAPIBasic {
    if (!this.api) {
      throw new Error("WebSocket connection not yet established.");
    }
    return this.api;
  }
}
