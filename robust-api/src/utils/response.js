export function ok(res, data = null) {
  return res.status(200).json({ data });
};

export function created(res, data = null, location = null) {
  if (location) {
    res.setHeader('Location', location);
  }
  return res.status(201).json({ data });
};

export function error(res, code = 'ERROR', message = 'Something went wrong', status = 500) {
  return res.status(status).json({
    error: {
      code,
      message,
    }
  });
};