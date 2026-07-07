// basic route controller
const helloWorld = (req, res, next) => {
  res.send('Hello World!');
};

const helloThere = (req, res, next) => {
  res.send('Hello There!');
};

// basic route controller with query parameters
const search = (req, res, next) => {
  res.json({
    query: req.query.q,
  });
};

const welcome = (req, res, next) => {
  res.render('welcome', { name: 'Developer' });
};

export {
  helloWorld,
  helloThere,
  search,
  welcome,
};