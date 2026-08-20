import { prisma } from './prisma';

export async function getProducts(query?: string) {
  return prisma.product.findMany({
    where: query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    } : {},
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function getServices(query?: string) {
  return prisma.service.findMany({
    where: query ? {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    } : {},
    orderBy: { createdAt: 'desc' },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export async function getBlogs(query?: string) {
  return prisma.blog.findMany({
    where: query ? {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    } : {},
    orderBy: { createdAt: 'desc' },
  });
}

export async function getBlogBySlug(slug: string) {
  return prisma.blog.findUnique({ where: { slug } });
}

export async function getJobs(query?: string) {
  return prisma.job.findMany({
    where: query ? {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    } : {},
    orderBy: { created_at: 'desc' },
  });
}

export async function getJobById(id: string) {
  return prisma.job.findUnique({ where: { id } });
}
