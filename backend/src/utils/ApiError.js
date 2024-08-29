import { ENV_VARS } from "../config/envVars.js";
export class ApiError {
  constructor(statusCode, message = "Something went wrong", stack = "") {
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.data = null;

    if (stack && ENV_VARS.NODE_ENV === "development") {
      this.stack = stack;
    }
  }
}
