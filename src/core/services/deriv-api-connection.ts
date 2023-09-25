import WebSocket from "ws";
//@ts-ignore
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic.js";

const connection = new WebSocket(process.env.DERIV_API!);
const derivAPI = new DerivAPIBasic({ connection });

export { derivAPI };
