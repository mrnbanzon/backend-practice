import fs from 'fs';
import zlib from 'zlib';
import express from 'express';

const app = express();

// basic upload endpoint that zips file upload - consider using multer; using headers for filenames, etc.
app.post('/upload', (req, res, next) => {
  const destination = fs.createWriteStream(new URL('./upload.gz', import.meta.url));
  const gzip = zlib.createGzip();

  req.pipe(gzip).pipe(destination);

  destination.on('close', () => {
    console.log('file has been uploaded and compressed');
    res.status(200).send({ status: 'success', });
  });
});

app.listen(3000, () => {
  console.log('basic upload service listening on port 3000');
});