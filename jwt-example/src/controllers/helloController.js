const hello = (req, res, next) => {
  res.json( {
    message: 'Hello World!'
  });
};

export default {
  hello,
};