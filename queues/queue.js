import { Queue } from 'bullmq';
import { connection } from '../redis.js';

export const emailQueue = new Queue('email-queue', {
  connection,
});

