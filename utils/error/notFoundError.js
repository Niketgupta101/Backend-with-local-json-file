import { BaseError } from "./baseError.js";
import { HttpStatusCode } from "./httpStatusCode.js";

export class NotFoundError extends BaseError {
  constructor(description = "No entry found with given details!!") {
    super("NOT_FOUND", HttpStatusCode.NOT_FOUND, description, true);
  }
}
