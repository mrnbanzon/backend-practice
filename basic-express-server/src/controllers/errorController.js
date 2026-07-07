const syncError = (req, res, next) => {
  throw new Error('Synchronous error!');
};

const asyncError = async (req, res, next) => {
  try {
    await Promise.reject(new Error('Asynchronous error!'));
    res.send('This will not be reached');
  } catch (err) {
    next(err);
  }
};

export {
  syncError,
  asyncError,
};