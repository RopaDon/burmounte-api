import { HttpError } from "routing-controllers";

export default class ServiceHubException extends HttpError {
  constructor(name: string, statusCode: number, message: string, params: any = {}) {
    super(statusCode, message);
    Object.setPrototypeOf(this, ServiceHubException.prototype);
    this.name = name;
  }
}
