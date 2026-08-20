import Link from "next/link";
import { ArrowRight, Package, Briefcase, Settings, Calendar } from "lucide-react";
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
      <Card className="h-full bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-2">
             <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <Package className="w-5 h-5" />
            </div>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-normal">
              {product.category}
            </Badge>
          </div>
          <CardTitle className="text-xl text-foreground font-semibold group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-sm line-clamp-3">
            {product.shortDesc}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto pt-4 border-t border-border/50 flex items-center text-sm font-medium text-primary">
          Explore Product
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
      <Card className="h-full bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-sm">
        <CardHeader className="pb-3">
           <div className="flex justify-between items-start mb-2">
             <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <Settings className="w-5 h-5" />
            </div>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-normal">
              {service.category}
            </Badge>
          </div>
          <CardTitle className="text-xl text-foreground font-semibold group-hover:text-primary transition-colors">
            {service.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-sm line-clamp-3">
            {service.shortDesc}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto pt-4 border-t border-border/50 flex items-center text-sm font-medium text-primary">
          View Service
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
      <Card className="h-full bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-muted-foreground font-normal border-border">
              {blog.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          </div>
          <CardTitle className="text-lg text-foreground font-semibold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {blog.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground text-sm line-clamp-3">
            {blog.excerpt}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto pt-4 flex items-center text-sm font-medium text-primary">
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
  description: string;
  campaign_id: string | null;
  open_source_viable: boolean;
  content_status: string;
  created_at: Date;
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job.id}`} className="group block h-full">
      <Card className="h-full flex flex-col bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
            {job.campaign_id && (
              <Badge variant="outline" className="text-xs font-normal text-muted-foreground border-border bg-muted/50">
                {job.campaign_id}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg text-foreground font-semibold group-hover:text-primary transition-colors">
            {job.title}
          </CardTitle>
          <div className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
             <span>{job.content_status}</span>
             <span>•</span>
             <span>{new Date(job.created_at).toLocaleDateString()}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-muted-foreground text-sm line-clamp-2 mb-2">
            {job.description.length > 120 ? `${job.description.slice(0, 120)}...` : job.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-sm font-medium text-primary">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </CardFooter>
      </Card>
    </Link>
  );
}
