console.log('start');

setTimeout(() => console.log('timeoout 1 (timer)'), 0);
setImmediate(() => console.log('setImmedate (check)'));

Promise.resolve()
  .then(() => console.log('promise then (microtask)'))
  .then(() => console.log('promise then 2 (microtask)'));

process.nextTick(() => console.log('nextTick (microtask higher priority)'));

console.log('end');