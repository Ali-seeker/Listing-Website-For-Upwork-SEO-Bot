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

## Future Cron Synchronization (Module 1 -> Module 2)

**Status:** Not Implemented Yet (As requested in Phase 24).

**Future Architecture:**
The website is built entirely decoupled from Module 1. 
When the 15-minute Cron Job is implemented in the future, it will read data from the Module 1 database and directly `UPSERT` records into the Module 2 `listing_website_db` PostgreSQL database using standard SQL or an external script. 
Because this Next.js app reads dynamically from its own database via Server Components, any updates made by the Cron job will be immediately reflected on the frontend without requiring any changes to this Next.js application codebase.
