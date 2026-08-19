import Link from "next/link";
import { ArrowRight, Package, Briefcase, FileText, Settings, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// -- PRODUCT CARD --
interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDesc: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <Card className="h-full bg-slate-900 border-slate-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-500/50 group-hover:shadow-[0_8px_30px_rgb(99,102,241,0.12)]">
        <CardHeader>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all">
            <Package className="w-6 h-6" />
          </div>
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="text-xl text-slate-100 group-hover:text-indigo-400 transition-colors">
              {product.name}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="w-fit bg-slate-800 text-slate-300 mt-2">
            {product.category}
          </Badge>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-slate-400 line-clamp-3">
            {product.shortDesc}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto pt-4 border-t border-slate-800/50 flex items-center text-sm font-medium text-indigo-400">
          View Product 
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </CardFooter>
      </Card>
    </Link>
  );
}

// -- SERVICE CARD --
interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDesc: string;
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="group block h-full">
      <Card className="h-full bg-slate-900 border-slate-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-cyan-500/50 group-hover:shadow-[0_8px_30px_rgb(6,182,212,0.12)]">
        <CardHeader>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
            <Settings className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl text-slate-100 group-hover:text-cyan-400 transition-colors">
            {service.name}
          </CardTitle>
          <Badge variant="secondary" className="w-fit bg-slate-800 text-slate-300 mt-2">
            {service.category}
          </Badge>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-slate-400 line-clamp-3">
            {service.shortDesc}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto pt-4 border-t border-slate-800/50 flex items-center text-sm font-medium text-cyan-400">
          Explore Service
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </CardFooter>
      </Card>
    </Link>
  );
}

// -- BLOG CARD --
interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  createdAt: Date;
}

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <Card className="h-full bg-slate-900 border-slate-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-purple-500/50 group-hover:shadow-[0_8px_30px_rgb(168,85,247,0.12)]">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-purple-400 border-purple-500/30">
              {blog.category}
            </Badge>
            <div className="flex items-center text-xs text-slate-500">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
          <CardTitle className="text-xl text-slate-100 group-hover:text-purple-400 transition-colors line-clamp-2">
            {blog.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-slate-400 line-clamp-3">
            {blog.excerpt}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto pt-4 flex items-center text-sm font-medium text-purple-400">
          Read Article
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </CardFooter>
      </Card>
    </Link>
  );
}

// -- JOB CARD --
interface Job {
  id: string;
  title: string;
  slug: string;
  category: string;
  skills: string[];
  shortDesc: string;
  source: string | null;
  createdAt: Date;
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.slug}`} className="group block h-full">
      <Card className="h-full bg-slate-900 border-slate-800 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/50 group-hover:shadow-[0_8px_30px_rgb(16,185,129,0.12)]">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            {job.source && (
              <Badge variant="outline" className="text-xs text-slate-400 border-slate-700 bg-slate-800/50">
                {job.source}
                <ExternalLink className="w-3 h-3 ml-1 inline" />
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg text-slate-100 group-hover:text-emerald-400 transition-colors">
            {job.title}
          </CardTitle>
          <div className="text-xs text-slate-500 flex items-center gap-2 mt-2">
             <span>{job.category}</span>
             <span>•</span>
             <span>{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-slate-400 line-clamp-2 mb-4">
            {job.shortDesc}
          </CardDescription>
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs text-slate-500 flex items-center">+{job.skills.length - 3} more</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-auto pt-4 border-t border-slate-800/50 flex items-center text-sm font-medium text-emerald-400">
          View Details
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </CardFooter>
      </Card>
    </Link>
  );
}
