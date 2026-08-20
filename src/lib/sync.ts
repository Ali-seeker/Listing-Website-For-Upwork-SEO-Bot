import { Client } from 'pg';
import { prisma } from './prisma';
import * as dotenv from 'dotenv';

// Load env variables
dotenv.config();

// Connect to Module 1 PostgreSQL
const module1Url = process.env.MODULE_1_DATABASE_URL;

async function getModule1Client() {
  if (!module1Url) {
    throw new Error("MODULE_1_DATABASE_URL is not defined in the environment.");
  }
  const client = new Client({ connectionString: module1Url });
  await client.connect();
  return client;
}

export async function syncJobs(client: Client) {
  const tableName = 'jobs_selected';
  const destinationTable = 'Job';
  let rowsSynced = 0;
  
  try {
    console.log(`[SYNC TABLE] ${tableName} -> ${destinationTable}`);
    
    // Get watermark
    let watermark = await prisma.syncWatermark.findUnique({ where: { table_name: tableName } });
    const lastSyncedAt = watermark ? watermark.last_synced_at : new Date(0);
    console.log(`[WATERMARK] Last synced at: ${lastSyncedAt.toISOString()}`);
    
    // Query source DB
    console.log(`[FETCH] Fetching records from Module 1...`);
    const res = await client.query(
      `SELECT id, title, description, campaign_id, open_source_viable, content_status, created_at 
       FROM ${tableName} 
       ORDER BY created_at ASC, id ASC`
    );
    
    const rows = res.rows;
    console.log(`[FETCH] Found ${rows.length} new records.`);
    
    if (rows.length === 0) {
      await logAudit(destinationTable, 0, null);
      return { table: destinationTable, fetched: 0, synced: 0, status: 'SUCCESS' };
    }
    
    const currentSyncTime = new Date();
    
    // Upsert records
    console.log(`[UPSERT] Syncing to Module 2...`);
    for (const row of rows) {
      await prisma.job.upsert({
        where: { id: row.id },
        update: {
          title: row.title,
          description: row.description,
          campaign_id: row.campaign_id,
          open_source_viable: row.open_source_viable,
          content_status: row.content_status,
          created_at: row.created_at
        },
        create: {
          id: row.id,
          title: row.title,
          description: row.description,
          campaign_id: row.campaign_id,
          open_source_viable: row.open_source_viable,
          content_status: row.content_status,
          created_at: row.created_at
        }
      });
      rowsSynced++;
    }
    
    // Update watermark
    await prisma.syncWatermark.upsert({
      where: { table_name: tableName },
      update: { last_synced_at: currentSyncTime },
      create: { table_name: tableName, last_synced_at: currentSyncTime }
    });
    
    // Log audit
    await logAudit(destinationTable, rowsSynced, null);
    
    return { table: destinationTable, fetched: rows.length, synced: rowsSynced, status: 'SUCCESS' };
  } catch (error: any) {
    console.error(`[SYNC FAILURE] Failed to sync ${tableName}:`, error.message);
    await logAudit(destinationTable, rowsSynced, error.message);
    return { table: destinationTable, fetched: 0, synced: rowsSynced, status: 'FAILED', error: error.message };
  }
}

export async function syncProduct(client: Client) {
  const tableName = 'product';
  const destinationTable = 'Product';
  let rowsSynced = 0;
  
  try {
    console.log(`[SYNC TABLE] ${tableName} -> ${destinationTable}`);
    
    let watermark = await prisma.syncWatermark.findUnique({ where: { table_name: tableName } });
    const lastSyncedAt = watermark ? watermark.last_synced_at : new Date(0);
    console.log(`[WATERMARK] Last synced at: ${lastSyncedAt.toISOString()}`);
    
    const res = await client.query(
      `SELECT id, name, slug, category, "shortDesc", description, problem, solution, "valueProp", "targetCustomer", features, technologies, status, "createdAt", "updatedAt" 
       FROM ${tableName} 
       WHERE "updatedAt" > $1 
       ORDER BY "updatedAt" ASC, id ASC`,
      [lastSyncedAt]
    );
    
    const rows = res.rows;
    if (rows.length === 0) {
      await logAudit(destinationTable, 0, null);
      return { table: destinationTable, fetched: 0, synced: 0, status: 'SUCCESS' };
    }
    
    let maxTimestamp = lastSyncedAt;
    
    for (const row of rows) {
      await prisma.product.upsert({
        where: { id: row.id },
        update: {
          name: row.name,
          slug: row.slug,
          category: row.category,
          shortDesc: row.shortDesc,
          description: row.description,
          problem: row.problem,
          solution: row.solution,
          valueProp: row.valueProp,
          targetCustomer: row.targetCustomer,
          features: row.features,
          technologies: row.technologies,
          status: row.status,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt
        },
        create: {
          id: row.id,
          name: row.name,
          slug: row.slug,
          category: row.category,
          shortDesc: row.shortDesc,
          description: row.description,
          problem: row.problem,
          solution: row.solution,
          valueProp: row.valueProp,
          targetCustomer: row.targetCustomer,
          features: row.features,
          technologies: row.technologies,
          status: row.status,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt
        }
      });
      rowsSynced++;
      if (new Date(row.updatedAt) > maxTimestamp) {
        maxTimestamp = new Date(row.updatedAt);
      }
    }
    
    await prisma.syncWatermark.upsert({
      where: { table_name: tableName },
      update: { last_synced_at: maxTimestamp },
      create: { table_name: tableName, last_synced_at: maxTimestamp }
    });
    
    await logAudit(destinationTable, rowsSynced, null);
    
    return { table: destinationTable, fetched: rows.length, synced: rowsSynced, status: 'SUCCESS' };
  } catch (error: any) {
    console.error(`[SYNC FAILURE] Failed to sync ${tableName}:`, error.message);
    await logAudit(destinationTable, rowsSynced, error.message);
    return { table: destinationTable, fetched: 0, synced: rowsSynced, status: 'FAILED', error: error.message };
  }
}

export async function syncBlog(client: Client) {
  const tableName = 'blog';
  const destinationTable = 'Blog';
  let rowsSynced = 0;
  
  try {
    console.log(`[SYNC TABLE] ${tableName} -> ${destinationTable}`);
    
    let watermark = await prisma.syncWatermark.findUnique({ where: { table_name: tableName } });
    const lastSyncedAt = watermark ? watermark.last_synced_at : new Date(0);
    console.log(`[WATERMARK] Last synced at: ${lastSyncedAt.toISOString()}`);
    
    const res = await client.query(
      `SELECT id, title, slug, category, excerpt, content, author, status, "createdAt", "updatedAt" 
       FROM ${tableName} 
       WHERE "updatedAt" > $1 
       ORDER BY "updatedAt" ASC, id ASC`,
      [lastSyncedAt]
    );
    
    const rows = res.rows;
    if (rows.length === 0) {
      await logAudit(destinationTable, 0, null);
      return { table: destinationTable, fetched: 0, synced: 0, status: 'SUCCESS' };
    }
    
    let maxTimestamp = lastSyncedAt;
    
    for (const row of rows) {
      await prisma.blog.upsert({
        where: { id: row.id },
        update: {
          title: row.title,
          slug: row.slug,
          category: row.category,
          excerpt: row.excerpt,
          content: row.content,
          author: row.author,
          status: row.status,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt
        },
        create: {
          id: row.id,
          title: row.title,
          slug: row.slug,
          category: row.category,
          excerpt: row.excerpt,
          content: row.content,
          author: row.author,
          status: row.status,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt
        }
      });
      rowsSynced++;
      if (new Date(row.updatedAt) > maxTimestamp) {
        maxTimestamp = new Date(row.updatedAt);
      }
    }
    
    await prisma.syncWatermark.upsert({
      where: { table_name: tableName },
      update: { last_synced_at: maxTimestamp },
      create: { table_name: tableName, last_synced_at: maxTimestamp }
    });
    
    await logAudit(destinationTable, rowsSynced, null);
    
    return { table: destinationTable, fetched: rows.length, synced: rowsSynced, status: 'SUCCESS' };
  } catch (error: any) {
    console.error(`[SYNC FAILURE] Failed to sync ${tableName}:`, error.message);
    await logAudit(destinationTable, rowsSynced, error.message);
    return { table: destinationTable, fetched: 0, synced: rowsSynced, status: 'FAILED', error: error.message };
  }
}

export async function syncServices(client: Client) {
  const tableName = 'services';
  const destinationTable = 'Service';
  let rowsSynced = 0;
  
  try {
    console.log(`[SYNC TABLE] ${tableName} -> ${destinationTable}`);
    
    let watermark = await prisma.syncWatermark.findUnique({ where: { table_name: tableName } });
    const lastSyncedAt = watermark ? watermark.last_synced_at : new Date(0);
    console.log(`[WATERMARK] Last synced at: ${lastSyncedAt.toISOString()}`);
    
    const res = await client.query(
      `SELECT id, name, slug, category, "shortDesc", description, problem, benefits, deliverables, process, status, "createdAt", "updatedAt" 
       FROM ${tableName} 
       WHERE "updatedAt" > $1 
       ORDER BY "updatedAt" ASC, id ASC`,
      [lastSyncedAt]
    );
    
    const rows = res.rows;
    if (rows.length === 0) {
      await logAudit(destinationTable, 0, null);
      return { table: destinationTable, fetched: 0, synced: 0, status: 'SUCCESS' };
    }
    
    let maxTimestamp = lastSyncedAt;
    
    for (const row of rows) {
      await prisma.service.upsert({
        where: { id: row.id },
        update: {
          name: row.name,
          slug: row.slug,
          category: row.category,
          shortDesc: row.shortDesc,
          description: row.description,
          problem: row.problem,
          benefits: row.benefits,
          deliverables: row.deliverables,
          process: row.process,
          status: row.status,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt
        },
        create: {
          id: row.id,
          name: row.name,
          slug: row.slug,
          category: row.category,
          shortDesc: row.shortDesc,
          description: row.description,
          problem: row.problem,
          benefits: row.benefits,
          deliverables: row.deliverables,
          process: row.process,
          status: row.status,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt
        }
      });
      rowsSynced++;
      if (new Date(row.updatedAt) > maxTimestamp) {
        maxTimestamp = new Date(row.updatedAt);
      }
    }
    
    await prisma.syncWatermark.upsert({
      where: { table_name: tableName },
      update: { last_synced_at: maxTimestamp },
      create: { table_name: tableName, last_synced_at: maxTimestamp }
    });
    
    await logAudit(destinationTable, rowsSynced, null);
    
    return { table: destinationTable, fetched: rows.length, synced: rowsSynced, status: 'SUCCESS' };
  } catch (error: any) {
    console.error(`[SYNC FAILURE] Failed to sync ${tableName}:`, error.message);
    await logAudit(destinationTable, rowsSynced, error.message);
    return { table: destinationTable, fetched: 0, synced: rowsSynced, status: 'FAILED', error: error.message };
  }
}

async function logAudit(tableName: string, rowsSynced: number, error: string | null) {
  try {
    await prisma.syncAuditLog.create({
      data: {
        table_name: tableName,
        rows_synced: rowsSynced,
        error: error
      }
    });
    if (error) {
      console.log(`[AUDIT] Logged FAILURE for ${tableName}`);
    } else {
      console.log(`[AUDIT] Logged SUCCESS for ${tableName}. Rows synced: ${rowsSynced}`);
    }
  } catch (e: any) {
    console.error(`[AUDIT ERROR] Failed to write to sync_audit_log for ${tableName}`, e.message);
  }
}

export async function runAllSyncs() {
  console.log(`\n[SYNC START] ${new Date().toISOString()}`);
  let client;
  try {
    client = await getModule1Client();
  } catch (e: any) {
    console.error("[SYNC FAILURE] Could not connect to Module 1 database:", e.message);
    await logAudit('ALL', 0, "Connection to Module 1 failed: " + e.message);
    return;
  }
  
  const results = [];
  results.push(await syncJobs(client));
  results.push(await syncProduct(client));
  results.push(await syncBlog(client));
  results.push(await syncServices(client));
  
  await client.end();
  
  console.log(`\n=== SYNC SUMMARY ===`);
  for (const r of results) {
    console.log(`${r.table}:`);
    console.log(`  fetched: ${r.fetched}`);
    console.log(`  synced: ${r.synced}`);
    console.log(`  status: ${r.status}`);
    if (r.error) {
      console.log(`  error: ${r.error}`);
    }
  }
  console.log(`[SYNC COMPLETED] ${new Date().toISOString()}\n`);
}
