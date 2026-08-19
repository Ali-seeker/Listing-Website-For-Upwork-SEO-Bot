# Module 2 - Independent Listing Website

This project is Phase 2 of the broader repository ecosystem, built to serve as an independent, public-facing listing hub for Products, Services, Blogs, and Jobs.

## Architecture & Stack

- **Framework**: Next.js 15+ (App Router, Server Components)
- **Styling**: Tailwind CSS, PostCSS, Custom Dark UI Theme
- **Database**: PostgreSQL
- **ORM**: Prisma v7 with `@prisma/adapter-pg`
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Components**: Shadcn UI (accessible, unstyled core components)

### Why this stack?
This stack is optimized for **Performance** (via Server Components), **Developer Experience** (TypeScript + Prisma), and **Modularity** (App Router). Because it uses Server Components, the data access layer can directly query the database securely without building a middle-layer API, resulting in faster and simpler rendering.

## Folder Structure

```
project-root/
│
├── module-1/ (External/Independent Python + Electron App)
│
├── listing-website/ (This Next.js Project)
│   ├── prisma/             # Schema, DB configuration, and Seed scripts
│   ├── src/
│   │   ├── app/            # App Router pages and global layouts
│   │   ├── components/     # Reusable UI components (Navbar, Cards, States)
│   │   └── lib/            # Data Access Layer and Utilities
│   ├── public/             # Static assets
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies
```

## Setup & Execution

### 1. Database Connection
Ensure you have a local PostgreSQL server running. Create a database named `listing_website_db`.
Update your `.env` file at the root:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/listing_website_db?schema=public"
```

### 2. Initialize Database
Sync the Prisma schema to your database:
```bash
npx prisma db push
```

### 3. Seed Development Data
Populate the database with realistic development data:
```bash
npx prisma db seed
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website.

## Available Routes

- `/` - Home Page (Hero, Value Props, Featured Grids)
- `/products` & `/products/[slug]` - Products Listing & Detail
- `/services` & `/services/[slug]` - Services Listing & Detail
- `/blog` & `/blog/[slug]` - Blog Listing & Detail
- `/jobs` & `/jobs/[slug]` - Jobs Listing & Detail

## Database Synchronization (Module 1 -> Module 2)

This project includes a server-side data synchronization system to automatically pull data from **Module 1 (Source Database)** into **Module 2 (Listing Website Database)**. 

The system uses an incremental watermark approach, ensuring it only fetches new or updated records (via `created_at` or `updatedAt` timestamps) instead of copying the entire database, preventing performance issues. It also includes an Audit Log feature (`SyncAuditLog`) that saves success/error counts and limits data duplication via Prisma `upsert` queries.

### Setup Synchronization
1. Copy `.env.example` to `.env` if not already done.
2. Update the `MODULE_1_DATABASE_URL` in `.env` to point to the Module 1 database.
```env
MODULE_1_DATABASE_URL="postgresql://username:password@localhost:5432/automation_UTP2"
```

### Commands
- **Run a single manual sync:**  
  *Immediately fetches and syncs all pending records. Good for testing.*
  ```bash
  npm run sync
  ```
- **Start the automated Cron Job worker:**  
  *Runs continuously in the background and executes the sync every 15 minutes.*
  ```bash
  npm run cron
  ```
