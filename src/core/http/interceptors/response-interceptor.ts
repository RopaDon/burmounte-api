import ServiceHubException from "../../exceptions/service-hub-exception";
import { Interceptor, InterceptorInterface, Action, HttpError } from "routing-controllers";
import { HttpStatusCodes } from "../status-codes";

@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    const { response, request } = action;

    if (response.statusCode >= 400) {
      const error = response.locals.error instanceof ServiceHubException ? response.locals.error : new HttpError(response.statusCode);

      // Handle exceptions
      return {
        data: null,
        success: response.statusCode < HttpStatusCodes.BAD_REQUEST,
        errors: [
          {
            type: error.constructor.name,
            message: error.message,
          },
        ],
        statusCode: response.statusCode,
        path: request.url,
        timestamp: new Date().toISOString(),
      };
    } else {
      // Shape the successful response
      return {
        data: content,
        success: response.statusCode < HttpStatusCodes.BAD_REQUEST,
        errors: [],
        statusCode: response.statusCode,
        path: request.url,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
