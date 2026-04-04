import { emailQueue } from './queue.js';

async function addJobs() {
  await emailQueue.add('send-email', {
    to: 'user@example.com',
    subject: 'Welcome!',
    body: 'Thanks for signing up 🎉',
  }, {
    attempts: 3,       // retry 3 times
    backoff: 5000,     // wait 5 sec between retries
  });

  console.log('Job added!');
}

addJobs();