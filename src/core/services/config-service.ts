// ConfigService.ts
import dotenv from "dotenv";
import { injectable } from "inversify";

@injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config();

    const nodeEnv = process.env.NODE_ENV || "development";

    const envFile = `.env.${nodeEnv}`;

    dotenv.config({ path: envFile });

    this.envConfig = process.env as any;
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
