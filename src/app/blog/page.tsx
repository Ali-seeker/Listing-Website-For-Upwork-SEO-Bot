import Image from "next/image";
import { getBlogs } from "@/lib/data";
import { BlogCard } from "@/components/ui/Cards";
import { EmptyState } from "@/components/ui/States";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

import { SearchBar } from "@/components/ui/SearchBar";

export const metadata = {
  title: "Blog | ListingHub",
  description: "Insights, news, and guides from our experts.",
};

type Props = {
  searchParams: Promise<{ query?: string }>;
};

export default async function BlogPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const blogs = await getBlogs(query);

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Insights & News</h1>
            <p className="text-muted-foreground text-lg">
              Stay updated with the latest articles, guides, and stories from our team of industry experts.
            </p>
          </div>
          <SearchBar placeholder="Search articles..." />
        </div>
      </FadeIn>

      {blogs.length === 0 ? (
        <FadeIn delay={0.2}>
          <EmptyState title="No articles found" description="We haven't published any articles yet. Check back soon." />
        </FadeIn>
      ) : (
        <>
          {/* Featured Post (First one) */}
          <FadeIn delay={0.1}>
            <div className="mb-12">
               <h2 className="text-xl font-semibold text-foreground mb-6">Featured Article</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card border border-border rounded-3xl overflow-hidden p-6 relative">
                 <div className="flex flex-col justify-center relative z-10">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold uppercase tracking-wider rounded-full border border-border">
                       {blogs[0].category}
                     </span>
                     <span className="text-muted-foreground text-sm">
                       {new Date(blogs[0].createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                     </span>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 hover:text-primary transition-colors">
                     <a href={`/blog/${blogs[0].slug}`}>{blogs[0].title}</a>
                   </h3>
                   <p className="text-muted-foreground mb-6 line-clamp-3">
                     {blogs[0].excerpt}
                   </p>
                   <a href={`/blog/${blogs[0].slug}`} className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors">
                     Read Full Article &rarr;
                   </a>
                 </div>
                 {/* Static Featured Image for Blog Layout */}
                 <div className="hidden md:block relative min-h-[300px] w-full bg-muted rounded-2xl overflow-hidden border border-border">
                    <Image 
                      src="/images/blog-featured.jpg" 
                      alt="Featured Tech Insights" 
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority
                    />
                 </div>
               </div>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Latest Posts</h2>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {blogs.slice(1).map(blog => (
                <StaggerItem key={blog.id}>
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </>
      )}
    </div>
  );
}
