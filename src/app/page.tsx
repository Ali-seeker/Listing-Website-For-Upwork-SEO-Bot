import Link from "next/link";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
import { ArrowRight, Search, Zap, Shield, CheckCircle2, Code, Sparkles, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProducts, getServices, getBlogs, getJobs } from "@/lib/data";
import { ProductCard, ServiceCard, BlogCard, JobCard } from "@/components/ui/Cards";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { HeroSearch } from "@/components/ui/HeroSearch";
import { HeroListingsRail } from "@/components/ui/HeroListingsRail";
import { HeroStats } from "@/components/ui/HeroStats";

export default async function HomePage() {
  const [products, services, blogs, jobs] = await Promise.all([
    getProducts().then(res => res.slice(0, 3)),
    getServices().then(res => res.slice(0, 3)),
    getBlogs().then(res => res.slice(0, 3)),
    getJobs().then(res => res.slice(0, 3)),
  ]);

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-border">
        {/* Dynamic Premium Background */}
        <div className="absolute inset-0 bg-background -z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-background to-background dark:from-indigo-900/20 -z-10" />
        <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col text-center lg:text-left">
              <FadeIn delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-border/80 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8 backdrop-blur-sm shadow-sm relative z-10 mx-auto lg:mx-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  Over 1,000+ curated tools inside
                </div>
                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-2xl mx-auto lg:mx-0 leading-[1.1] relative z-10 ${spaceGrotesk.className}`}>
                  Discover Products, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Services & Jobs</span>
                </h1>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed ${spaceGrotesk.className}`}>
                  The premium technology marketplace connecting you with curated software tools, expert professionals, and career opportunities.
                </p>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <div className="max-w-2xl mx-auto lg:mx-0">
                  <div className="bg-card/40 backdrop-blur-xl border border-border/80 dark:border-border rounded-2xl p-2 shadow-xl shadow-indigo-900/5 text-left relative z-20">
                    <HeroSearch />
                  </div>
                  
                  <HeroStats />
                </div>
              </FadeIn>
            </div>

            {/* Right Content - Hero Listings Rail */}
            <div className="relative lg:pl-10 w-full h-full flex items-center justify-center">
              <FadeIn delay={0.4} className="w-full">
                <HeroListingsRail />
              </FadeIn>
            </div>
            
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-10 border-b border-border pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Featured Products</h2>
            <p className="text-muted-foreground text-sm md:text-base">Discover powerful software tools and applications.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-all hover:translate-x-1">
            View all products <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <StaggerItem key={product.id} className="transition-transform duration-300 hover:-translate-y-1">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-8 sm:hidden">
          <Link href="/products" className="w-full">
            <Button variant="outline" className="w-full">
              View all products
            </Button>
          </Link>
        </div>
      </section>

      {/* Professional Services */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-10 border-b border-border pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Professional Services</h2>
            <p className="text-muted-foreground text-sm md:text-base">Expert consulting, development, and support.</p>
          </div>
          <Link href="/services" className="hidden sm:flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-all hover:translate-x-1">
            View all services <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <StaggerItem key={service.id} className="transition-transform duration-300 hover:-translate-y-1">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Jobs & Insights Grid */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Latest Jobs */}
          <div>
            <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
              <h2 className="text-2xl font-semibold text-foreground">Latest Opportunities</h2>
              <Link href="/jobs" className="flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-all hover:translate-x-1">
                All jobs <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <StaggerContainer className="flex flex-col gap-4">
              {jobs.map(job => (
                <StaggerItem key={job.id} className="transition-transform duration-300 hover:-translate-x-1">
                  <JobCard job={job} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Latest Articles */}
          <div>
            <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
              <h2 className="text-2xl font-semibold text-foreground">Insights & Editorial</h2>
              <Link href="/blog" className="flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-all hover:translate-x-1">
                Read more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <StaggerContainer className="flex flex-col gap-4">
              {blogs.map(blog => (
                <StaggerItem key={blog.id} className="transition-transform duration-300 hover:-translate-x-1">
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
