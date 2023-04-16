import { BaseError } from "./baseError.js";
import { HttpStatusCode } from "./httpStatusCode.js";

export class UnauthorizedError extends BaseError {
  constructor(description = "Not Authorized to access this route") {
    super("UNAUTHORIZED ACCESS", HttpStatusCode.UNAUTHORIZED, description, true);
  }
}
