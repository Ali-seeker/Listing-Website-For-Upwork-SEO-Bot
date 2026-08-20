import { getProductBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Package, Code } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  return {
    title: product ? `${product.name} | ListingHub` : "Product Not Found",
    description: product?.shortDesc || "View product details.",
  };
}

export default async function ProductDetailPage(props: Props) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20 font-medium">
                  {product.category}
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground font-medium mb-8">
              {product.shortDesc}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
              <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground border-b border-border pb-2">Overview</h2>
              <p className="mb-6 leading-relaxed">
                {product.description}
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground border-b border-border pb-2">The Problem</h2>
              <p className="mb-6 leading-relaxed bg-muted/50 p-6 rounded-xl border border-border">
                {product.problem}
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground border-b border-border pb-2">The Solution</h2>
              <p className="mb-6 leading-relaxed bg-primary/5 p-6 rounded-xl border border-primary/20">
                {product.solution}
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FadeIn delay={0.3}>
            <div className="sticky top-24 space-y-6">
              {/* Action Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-2">Get Started</h3>
                <p className="text-sm text-muted-foreground mb-6">Start using {product.name} today and transform your workflow.</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-12 mb-3">
                  Try it now
                </Button>
                <Button variant="outline" className="w-full border-border hover:bg-muted text-foreground rounded-lg h-12">
                  View Documentation
                </Button>
              </div>

              {/* Value Proposition */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Value Proposition</h3>
                <p className="text-sm text-muted-foreground mb-6">{product.valueProp}</p>
                
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Customer & Tech */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">Ideal For</h3>
                <p className="text-sm text-muted-foreground mb-6">{product.targetCustomer}</p>

                {product.technologies.length > 0 && (
                  <>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Code className="w-4 h-4" /> Built With
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.technologies.map(tech => (
                        <Badge key={tech} variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
