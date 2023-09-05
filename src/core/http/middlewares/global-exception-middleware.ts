import { ExceptionTypes } from "../../exceptions/types";
import ServiceHubException from "../../exceptions/service-hub-exception";
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { HttpStatusCodes } from "../status-codes";

@Middleware({ type: "after" })
export class GlobalExceptioMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, _request: any, response: any, _next: (err?: any) => any) {
    if (error instanceof ServiceHubException) {
      response.status(error.httpCode).send({
        data: null,
        success: response.statusCode < HttpStatusCodes.BAD_REQUEST,
        errors: [
          {
            type: error.name,
            message: error.message,
          },
        ],
        statusCode: error.httpCode,
        timestamp: new Date().toISOString(),
      });
    } else {
      response.status(500).send({
        data: null,
        success: response.statusCode < HttpStatusCodes.BAD_REQUEST,
        errors: [
          {
            type: ExceptionTypes.INTERNAL_SERVER_ERROR,
            error: error.message,
            message: "Something unexpected has happened. Please contact the development team at developer@insurehospitality.pro",
          },
        ],
        statusCode: 500,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
