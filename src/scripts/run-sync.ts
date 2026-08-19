import { runAllSyncs } from '../lib/sync';

async function main() {
  await runAllSyncs();
  process.exit(0);
}

main().catch(e => {
  console.error("Fatal error during sync:", e);
  process.exit(1);
});
