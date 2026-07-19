import logger from "../utils/logger.js";
import { ApiError } from "../errors/ApiError.js";

export function errorHandler(err, req, res, next) {
  const error = err instanceof Error && err.toJSON
    ? err
    : new ApiError(500, 'INTERNAL_ERROR', err.message || String(err));

  const status = error.status || 500;

  logger.error(
    {
      err: error,
      path: req.path,
      method: req.method,
      requestId: req.headers['x-request-id'],
    },
    'unhandled error'
  );

  res.status(status).json({
    error: error.toJSON ? error.toJSON() : { message: error.message },
  });
};