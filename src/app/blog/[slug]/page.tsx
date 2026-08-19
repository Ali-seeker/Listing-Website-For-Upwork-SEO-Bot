import { getBlogBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/MotionWrapper";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const blog = await getBlogBySlug(params.slug);
  return {
    title: blog ? `${blog.title} | ListingHub Blog` : "Post Not Found",
    description: blog?.excerpt || "Read our latest blog post.",
  };
}

export default async function BlogDetailPage(props: Props) {
  const params = await props.params;
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">
      <FadeIn>
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-purple-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </FadeIn>

      <FadeIn delay={0.1}>
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider rounded-full border border-purple-500/20">
              {blog.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
        </header>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="prose prose-invert prose-lg max-w-none prose-p:text-slate-300 prose-headings:text-slate-100 prose-a:text-purple-400 hover:prose-a:text-purple-300">
          <p className="text-xl text-slate-400 italic border-l-4 border-purple-500/50 pl-4 mb-10">
            {blog.excerpt}
          </p>
          
          <div 
            className="whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400">
            <Tag className="w-4 h-4" />
            <span className="text-sm">Posted in <span className="text-slate-200">{blog.category}</span></span>
          </div>
        </div>
      </FadeIn>
    </article>
  );
}
