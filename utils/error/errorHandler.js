import { BaseError } from "./baseError.js";
import { logger } from "../logger.js";

class ErrorHandler {
  async handleError(err) {
    await logger.error(
      "Error message from the centralized error-handling component",
      err
    );
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
  getStatusCode(error) {
    if (error instanceof BaseError) {
      return error.httpCode;
    }
    return 500;
  }
}
export const errorHandler = new ErrorHandler();
