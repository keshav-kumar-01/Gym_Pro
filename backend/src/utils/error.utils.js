class APIError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const createError = (statusCode, message, details = null) => {
  return new APIError(statusCode, message, details);
};

module.exports = { APIError, createError };
