import { getBlogs } from "@/lib/data";
import { BlogCard } from "@/components/ui/Cards";
import { EmptyState } from "@/components/ui/States";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

export const metadata = {
  title: "Blog | ListingHub",
  description: "Insights, news, and guides from our experts.",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Insights & News</h1>
          <p className="text-slate-400 text-lg">
            Stay updated with the latest articles, guides, and stories from our team of industry experts.
          </p>
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
               <h2 className="text-xl font-semibold text-slate-200 mb-6">Featured Article</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900 border border-purple-500/20 rounded-3xl overflow-hidden p-6 relative">
                 <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
                 <div className="flex flex-col justify-center relative z-10">
                   <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider rounded-full border border-purple-500/20">
                       {blogs[0].category}
                     </span>
                     <span className="text-slate-500 text-sm">
                       {new Date(blogs[0].createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                     </span>
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 hover:text-purple-400 transition-colors">
                     <a href={`/blog/${blogs[0].slug}`}>{blogs[0].title}</a>
                   </h3>
                   <p className="text-slate-400 mb-6 line-clamp-3">
                     {blogs[0].excerpt}
                   </p>
                   <a href={`/blog/${blogs[0].slug}`} className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center transition-colors">
                     Read Full Article &rarr;
                   </a>
                 </div>
                 {/* Decorative placeholder for featured image */}
                 <div className="hidden md:flex items-center justify-center bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-700 font-medium">Featured Image Visual</span>
                 </div>
               </div>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-200">Latest Posts</h2>
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
