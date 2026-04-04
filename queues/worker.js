import { Worker } from 'bullmq';
import { connection } from '../redis.js';

const worker = new Worker(
  'email-queue',
  async job => {
    console.log('Processing job:', job.id);

    // Simulate email sending
    if (Math.random() < 0.3) {
      throw new Error('Random failure!');
    }

    console.log(`Email sent to ${job.data.to}`);
  },
  { connection }
);

// Events
worker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed: ${err.message}`);
});