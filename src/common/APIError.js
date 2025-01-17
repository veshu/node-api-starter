/* eslint-disable max-classes-per-file */
const httpStatus = require('http-status-codes');

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor({
    message,
    errors,
    status,
    isPublic,
    stack,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    stack,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false,
  }) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack,
    });
  }
}

module.exports = {
  APIError,
  UnauthorizedError: new APIError({
    message: 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
  }),
  NotFoundError: new APIError({
    message: 'NotFound',
    status: httpStatus.NOT_FOUND,
  }),
  BadRequestError: new APIError({
    message: 'NotFound',
    status: httpStatus.BAD_REQUEST,
  }),
  ForbiddenError: new APIError({
    message: 'Forbidden',
    status: httpStatus.FORBIDDEN,
  }),
  ValidationError: (errors, message, err) => new APIError({
    message: message || 'Validation Error',
    errors,
    status: httpStatus.CONFLICT,
    isPublic: true,
    stack: err.stack,
  }),
};
