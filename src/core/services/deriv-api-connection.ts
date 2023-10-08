//@ts-ignore
import DerivAPI from "@deriv/deriv-api/dist/DerivAPI";
import { LoggerService } from "./logger-service";

(global as any).WebSocket = require("ws");

const lang = process.env.DERIV_LANGUAGE!;
const endpoint = process.env.DERIV_ENDPOINT!;
const app_id = parseInt(process.env.DERIV_APP_ID!);

class DerivAPIConnector {
  private api!: DerivAPI;
  private logger: LoggerService;
  private isConnectionEstablished: boolean = false;
  private static instance: DerivAPIConnector | null = null;

  private constructor() {
    this.logger = new LoggerService(this.constructor.name);
  }

  public async connect(): Promise<void> {
    if (this.isConnectionEstablished) {
      throw new Error("A connection is already established to the Deriv Websocket Server");
    }
    this.api = new DerivAPI({ app_id, endpoint, lang });

    this.setupEventListeners();
  }

  public static getInstance(): DerivAPIConnector {
    if (!DerivAPIConnector.instance) {
      DerivAPIConnector.instance = new DerivAPIConnector();
    }
    return DerivAPIConnector.instance;
  }

  public async waitForConnection(): Promise<void> {
    if (!this.isConnectionEstablished) {
      // Wait for the connection to be established before resolving the promise
      await new Promise((resolve) => {
        const checkConnection = () => {
          if (this.isConnectionEstablished) {
            resolve(true);
          } else {
            // Check again after a short delay
            setTimeout(checkConnection, 100);
          }
        };
        // Start checking the connection status
        checkConnection();
      });
    }
  }

  private setupEventListeners() {
    this.api.basic.connection.addEventListener("open", async () => {
      this.isConnectionEstablished = true;
      this.logger.info("Successfully connected to Deriv's Websocket Server");
    });

    // Add an event listener for the 'close' event
    this.api.basic.connection.addEventListener("close", (event: any) => {
      if (event.wasClean) {
        this.logger.info(`Deriv connection closed cleanly, code: ${event.code}, reason: ${event.reason}`);
      } else {
        this.logger.error(`Deriv connection died unexpectedly. Reconnecting...`);
        // Attempt to reconnect
        this.reconnect();
      }
      this.isConnectionEstablished = false;
    });

    // Add an event listener for the 'error' event
    this.api.basic.connection.addEventListener("error", (error: any) => {
      this.logger.error("Deriv connection error:", error);
      this.isConnectionEstablished = false;
      // Attempt to reconnect
      this.reconnect();
    });
  }

  private async reconnect() {
    // Attempt to reconnect with a delay
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Adjust the delay as needed
    this.connect()
      .then(() => {
        this.logger.info("Attempting to reconnect to Deriv's Websocket Server");
      })
      .catch((error) => {
        this.logger.error("Reconnection failed:", error);
        // Retry reconnection if needed
        this.reconnect();
      });
  }

  public getAPI(): DerivAPI {
    return this.api;
  }
}

export const derivAPI = DerivAPIConnector.getInstance();
