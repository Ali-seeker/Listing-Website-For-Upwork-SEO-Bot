import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding data...');

  // Jobs
  await prisma.job.createMany({
    data: [
      {
        title: 'Senior Full Stack Developer (Next.js & Node.js)',
        description: 'We are looking for a senior developer to lead our web platform engineering. You must be proficient in React, Next.js, and backend integration using Node.js.',
        campaign_id: 'camp_101',
        open_source_viable: true,
        content_status: 'completed',
      },
      {
        title: 'UX/UI Designer for SaaS Dashboard',
        description: 'Seeking an experienced UI/UX designer to revamp our internal SaaS dashboard. Experience with Figma and building Design Systems is required.',
        campaign_id: 'camp_102',
        open_source_viable: false,
        content_status: 'pending',
      },
      {
        title: 'Freelance Technical Writer - AI Topics',
        description: 'Need a writer to produce high-quality articles on Artificial Intelligence, Machine Learning, and their business applications.',
        campaign_id: 'camp_103',
        open_source_viable: true,
        content_status: 'completed',
      }
    ],
    skipDuplicates: true,
  });

  // Products
  await prisma.product.createMany({
    data: [
      {
        name: 'Analytics Pro Dashboard',
        slug: 'analytics-pro-dashboard',
        category: 'SaaS',
        shortDesc: 'A comprehensive analytics dashboard template built with React.',
        description: 'A comprehensive analytics dashboard template built with React and Tailwind CSS. Perfect for SaaS applications and internal tools.',
        problem: 'Building custom analytics dashboards from scratch takes weeks of engineering time.',
        solution: 'A drop-in, customizable template with pre-built charts and data visualization components.',
        valueProp: 'Save 100+ hours of development time while delivering a premium user experience.',
        targetCustomer: 'B2B SaaS Founders and Frontend Engineers',
        features: ['Real-time charts', 'Dark mode support', 'Export to PDF/CSV', 'Role-based access control'],
        technologies: ['React', 'Next.js', 'Tailwind CSS', 'Recharts'],
        status: 'published',
      },
      {
        name: 'Nexus API Gateway',
        slug: 'nexus-api-gateway',
        category: 'Infrastructure',
        shortDesc: 'Enterprise-grade API gateway for microservices.',
        description: 'Enterprise-grade API gateway for managing, securing, and scaling your microservices architecture with ease.',
        problem: 'Managing authentication, rate limiting, and routing across dozens of microservices is complex and error-prone.',
        solution: 'A unified gateway that handles cross-cutting concerns at the edge.',
        valueProp: 'Reduce latency by 40% and simplify your microservice architecture.',
        targetCustomer: 'Backend Engineers and DevOps Teams',
        features: ['Rate limiting', 'JWT Authentication', 'Load balancing', 'Analytics & Monitoring'],
        technologies: ['Go', 'Redis', 'Docker'],
        status: 'published',
      },
      {
        name: 'CloudSync Storage Engine',
        slug: 'cloudsync-storage',
        category: 'Developer Tools',
        shortDesc: 'Seamless cloud storage integration library.',
        description: 'Seamless cloud storage integration library for modern web apps. Supports AWS S3, Google Cloud Storage, and Azure Blob.',
        problem: 'Vendor lock-in and complex SDKs make handling file uploads difficult.',
        solution: 'A unified API that abstracts away provider-specific complexities.',
        valueProp: 'Write your upload logic once and switch providers instantly without code changes.',
        targetCustomer: 'Full-stack Developers',
        features: ['Multi-provider support', 'Chunked uploads', 'Automatic retry', 'Progress tracking'],
        technologies: ['TypeScript', 'Node.js'],
        status: 'published',
      }
    ],
    skipDuplicates: true,
  });

  // Services
  await prisma.service.createMany({
    data: [
      {
        name: 'Custom Web Application Development',
        slug: 'custom-web-app-development',
        category: 'Development',
        shortDesc: 'End-to-end development of scalable web applications.',
        description: 'End-to-end development of scalable, performant, and secure web applications tailored to your business needs.',
        problem: 'Off-the-shelf software doesn\'t fit your unique business workflows, limiting your growth and efficiency.',
        benefits: ['Increased efficiency', 'Scalable architecture', 'Competitive advantage'],
        deliverables: ['Custom Web App', 'Source Code', 'Technical Documentation', '3 months support'],
        process: ['Discovery & Planning', 'UI/UX Design', 'Development & Testing', 'Deployment', 'Maintenance'],
        status: 'published',
      },
      {
        name: 'Cloud Infrastructure Auditing',
        slug: 'cloud-infrastructure-audit',
        category: 'Consulting',
        shortDesc: 'Comprehensive review of your cloud infrastructure.',
        description: 'Comprehensive review of your cloud infrastructure to identify cost savings, security vulnerabilities, and performance bottlenecks.',
        problem: 'Cloud bills are spiraling out of control and you are unsure about your security posture.',
        benefits: ['Reduced AWS/GCP bills', 'Enhanced security', 'Improved uptime'],
        deliverables: ['Detailed Audit Report', 'Cost Optimization Plan', 'Security Remediation Guide'],
        process: ['Initial Assessment', 'Deep Dive Analysis', 'Report Generation', 'Review Presentation'],
        status: 'published',
      },
      {
        name: 'SEO Strategy & Optimization',
        slug: 'seo-strategy-optimization',
        category: 'Marketing',
        shortDesc: 'Data-driven SEO strategies to improve rankings.',
        description: 'Data-driven SEO strategies to improve your organic search rankings, drive traffic, and increase conversions.',
        problem: 'Your great product is hidden on page 5 of Google, costing you valuable organic leads.',
        benefits: ['Higher organic traffic', 'Better brand visibility', 'Increased conversions'],
        deliverables: ['Keyword Research', 'On-page Optimization', 'Technical SEO Audit', 'Content Strategy'],
        process: ['Site Audit', 'Keyword Planning', 'Implementation', 'Monitoring & Reporting'],
        status: 'published',
      }
    ],
    skipDuplicates: true,
  });

  // Blogs
  await prisma.blog.createMany({
    data: [
      {
        title: 'The Future of AI in Web Development',
        slug: 'future-of-ai-web-development',
        category: 'Technology',
        excerpt: 'Artificial Intelligence is revolutionizing how we build web applications.',
        content: 'Artificial Intelligence is revolutionizing how we build web applications. From intelligent code assistants to automated testing and personalized user experiences, AI is becoming an indispensable tool for developers.\n\nIn the coming years, we expect to see even more integration of AI models directly into the browser...',
        author: 'Jane Doe',
        status: 'published',
      },
      {
        title: '10 Best Practices for Building Scalable SaaS Apps',
        slug: 'best-practices-scalable-saas',
        category: 'Architecture',
        excerpt: 'Building a SaaS application that can handle thousands of users requires careful planning.',
        content: 'Building a SaaS application that can handle thousands of users requires careful planning. In this article, we explore key architectural decisions, database optimization techniques, and deployment strategies.\n\n1. Use a managed database\n2. Implement robust caching\n3. Decouple your services...',
        author: 'John Smith',
        status: 'published',
      },
      {
        title: 'Why Next.js is the Ultimate Framework for 2026',
        slug: 'why-nextjs-ultimate-framework',
        category: 'Development',
        excerpt: 'Next.js has evolved significantly, offering unparalleled developer experience.',
        content: 'Next.js has evolved significantly, offering unparalleled developer experience and performance. With advanced routing, server components, and edge rendering, it remains the top choice for modern web development.\n\nThe introduction of Turbopack and enhanced Server Actions makes building complex applications faster than ever.',
        author: 'Alice Johnson',
        status: 'published',
      }
    ],
    skipDuplicates: true,
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
