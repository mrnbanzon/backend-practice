export class ApiError extends Error {
  constructor(status = 500, code = 'INTERNAL_ERROR', message = 'Internal Error', details = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }
};