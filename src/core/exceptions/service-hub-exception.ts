import { HttpError } from "routing-controllers";

export default class ServiceHubException extends HttpError {
  constructor(statusCode: number, message: string, params: any = {}) {
    super(statusCode, message);
    Object.setPrototypeOf(this, ServiceHubException.prototype);
  }
}
