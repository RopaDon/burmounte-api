// DerivAPIBasic.d.ts
declare module "@deriv/deriv-api/dist/DerivAPIBasic.js" {
  class DerivAPIBasic {
    constructor(options: {
      connection: any;
      // Add other constructor parameters if needed
    });

    ping: () => void;
    activeSymbols: (type: string) => Promise<any>;
    authorize: (token: string) => Promise<any>;
  }

  export default DerivAPIBasic;
}
