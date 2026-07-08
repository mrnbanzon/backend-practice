const errorHandler = (err, req, res, next) => {
  if (err) {
    console.error('Error:', err.message);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
  }
  next();
};

export default errorHandler;