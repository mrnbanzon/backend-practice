import fs from 'fs';
import zlib from 'zlib';

const source = fs.createReadStream(new URL('./large-file.txt', import.meta.url));

const destination = fs.createWriteStream(new URL('./large-file.txt.gz', import.meta.url));

const gzip = zlib.createGzip();

source.pipe(gzip).pipe(destination);

destination.on('close', () => {
  console.log('file has been compressed');
});