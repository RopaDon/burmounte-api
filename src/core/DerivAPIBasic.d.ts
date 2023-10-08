// DerivAPIBasic.d.ts
declare module "@deriv/deriv-api/dist/DerivAPI" {
  import { WebSocket } from "ws";

  class DerivAPI {
    constructor(options: { lang?: string; app_id: number; endpoint?: string; connection?: WebSocket });

    public connection: WebSocket;

    public basic: any;
    public assets: () => any;
    public ping: (data: any) => any;
    public ticks: (symbol: string) => any;
    public account: (token: string) => any;
    public activeSymbols: (type: any) => Promise<any>;
    public authorize: (token: string) => Promise<any>;
  }

  export default DerivAPI;
}
