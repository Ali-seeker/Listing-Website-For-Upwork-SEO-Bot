import cron from 'node-cron';
import { runAllSyncs } from '../lib/sync';

console.log('Starting sync cron job. It will run every 15 minutes...');

// Schedule tasks to be run on the server.
cron.schedule('*/15 * * * *', async () => {
  console.log('--- CRON TRIGGERED SYNC ---');
  await runAllSyncs();
});

// Optionally run once on startup
// runAllSyncs();
