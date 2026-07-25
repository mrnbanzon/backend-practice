const hello = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  res.send('Hello World!');
};

export default {
  hello
};