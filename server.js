import cron from "node-cron";

// Schedule a task every 5 seconds
cron.schedule('*/5 * * * * *', () => {
  console.log('Running a task every 5 seconds:', new Date().toLocaleTimeString());

  
});