// basic 404 not found middleware
const notFound = (err, req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
  });
};

export default notFound;