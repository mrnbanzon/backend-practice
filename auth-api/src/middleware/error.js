export default (err, req, res, next) => {
  res.status(400).json({
    error: err.message || 'An error occurred',
  });
};