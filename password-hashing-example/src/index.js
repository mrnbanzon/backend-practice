// example of hashing and verifying a password

import {
  hashPassword,
  verifyPassword
} from './utils/password.js';


(async function run() {
  const pw = 'p@ssw0rd123';
  
  const hash = await hashPassword(pw);
  console.log('hash', hash);

  const ok = await verifyPassword(hash, pw);
  console.log('verified:', ok);
})();

