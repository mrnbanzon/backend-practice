import express from 'express';
import crypto from 'crypto';

const app = express();

const items = [{ id: 1, text: 'hello' }];

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));

  if (!item) {
    return res.status(404).send();
  }

  const body = JSON.stringify(item);
  const etag = crypto.createHash('sha1').update(body).digest('hex');

  res.setHeader('ETag', etag);

  if (req.headers['if-none-match'] === etag) {
    // client has the latest version, so we can return 304 Not Modified
    return res.status(304).send();
  }

  // set cache control headers to allow caching for 1 hour
  res.setHeader('Cache-Control', 'max-age=3600, public, must-revalidate');

  res.json(item);
});

app.listen(3000, () => {
  console.log('Simple Item Service is running on port 3000');
});