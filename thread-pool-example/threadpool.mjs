import { readFileSync } from "fs";
import crypto from "crypto";

console.log('start');

setTimeout(() => console.log('timer'), 0);

// synchronous file read blocking event loop:

const contents = readFileSync(new URL('./large-file.txt', import.meta.url));
console.log('sync file read done');


// asnyc crypto pbkdf2 uses libuv thread pool to offload work from event loop:
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
  console.log('pbkdf2 done');
});

console.log('end');