import EventEmmiter from 'events';

class JobQueue extends EventEmmiter {
  add(job) {
    setImmediate(() => this.emit('job', job));
  }
}

const queue = new JobQueue();

queue.on('job', (job) => {
  console.log('processing', job);
});

queue.add({ id: 1, task: 'send-email' });