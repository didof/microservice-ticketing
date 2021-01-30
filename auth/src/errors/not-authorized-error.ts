import { CustomError, SerializedError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  constructor() {
    super("Not authorized error");
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
  statusCode = 401;
  serializeErrors(): SerializedError[] {
    return [{ message: "Not authorized" }];
  }
}
