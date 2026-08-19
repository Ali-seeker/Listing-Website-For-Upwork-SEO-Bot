import Link from "next/link";
import { ArrowRight, Search, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProducts, getServices, getBlogs, getJobs } from "@/lib/data";
import { ProductCard, ServiceCard, BlogCard, JobCard } from "@/components/ui/Cards";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";

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
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>Module 2: Independent Listing Hub</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              Discover Smarter <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Solutions & Services
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Browse top-tier software products, professional services, informative articles, and the latest job opportunities in one unified platform.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 w-full sm:w-auto">
                Explore Products
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-200 rounded-full px-8 h-12 w-full sm:w-auto">
                <Search className="w-4 h-4 mr-2" />
                Find Jobs
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-2">Featured Products</h2>
            <p className="text-slate-400">Discover software tools and applications to boost productivity.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center text-indigo-400 hover:text-indigo-300 font-medium">
            View all <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <div className="mt-6 sm:hidden">
          <Link href="/products" className="w-full">
            <Button variant="outline" className="w-full border-slate-800">
              View all products
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Services */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-2">Professional Services</h2>
            <p className="text-slate-400">Expert consulting, development, and support services.</p>
          </div>
          <Link href="/services" className="hidden sm:flex items-center text-cyan-400 hover:text-cyan-300 font-medium">
            View all <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Latest Jobs & Blog Grid */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Latest Jobs */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-bold text-slate-100">Latest Jobs</h2>
              <Link href="/jobs" className="flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                All jobs <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <StaggerContainer className="flex flex-col gap-4">
              {jobs.map(job => (
                <StaggerItem key={job.id}>
                  <JobCard job={job} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Latest Articles */}
          <div>
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-bold text-slate-100">Insights & News</h2>
              <Link href="/blog" className="flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium">
                Read more <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <StaggerContainer className="flex flex-col gap-4">
              {blogs.map(blog => (
                <StaggerItem key={blog.id}>
                  <BlogCard blog={blog} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="container mx-auto px-4 md:px-8 mt-12">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Unified Platform</h3>
              <p className="text-slate-400 text-sm">Access products, services, and opportunities all from one seamless interface.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure & Reliable</h3>
              <p className="text-slate-400 text-sm">Built on modern, scalable, and independent architecture for maximum stability.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Fast Performance</h3>
              <p className="text-slate-400 text-sm">Optimized loading speeds and subtle animations that enhance the user experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
