import { HttpStatusCodes } from "../http/status-codes";
import { LoggerService } from "../services/logger-service";
import ServiceHubException from "./service-hub-exception";
//
export default function ServiceHubExceptionDelegate(error: any, loggerService: LoggerService): ServiceHubException {
  // Check if the error is already a ServiceHubException
  if (error instanceof ServiceHubException) {
    loggerService.error(`Exception: ${error.message}`);
    return error; // Re-throw it as is
  } else {
    loggerService.error(`Exception: ${JSON.stringify(error)}`);

    return new ServiceHubException(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "We apologize, but something went wrong while processing your request. Please try again later."
    );
  }
}
