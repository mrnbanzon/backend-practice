const mongooseErrorHandler = (err, req, res, next) => {
  console.error('Mongoose Error:', err);
  // validation error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => {
      return {
        field: e.path,
        message: e.message,
      };
    });
    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        details,
      }
    });
  }

  // duplicate key error
  if (err.code === 11000) {
    const fields = Object.keys(err.KeyValue || {});
    return res.status(409).json({
      error: {
        code: 'DUPLICATE_KEY_ERROR',
        fields,
      }
    });
  }

  // invalid field type error
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: {
        code: 'INVALID_ID_ERROR',
        message: err.message,
      }
    });
  }

  // fallback to default error handler
  return next(err);
};

export default mongooseErrorHandler;