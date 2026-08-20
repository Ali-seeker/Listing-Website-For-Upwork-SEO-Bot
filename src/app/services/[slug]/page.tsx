import { getServiceBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Settings, ListChecks } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const service = await getServiceBySlug(params.slug);
  return {
    title: service ? `${service.name} | ListingHub` : "Service Not Found",
    description: service?.shortDesc || "View service details.",
  };
}

export default async function ServiceDetailPage(props: Props) {
  const params = await props.params;
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <Link href="/services" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                <Settings className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{service.name}</h1>
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-normal">
                  {service.category}
                </Badge>
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground font-medium mb-8">
              {service.shortDesc}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
              <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground border-b border-border pb-2">About This Service</h2>
              <p className="mb-6 leading-relaxed">
                {service.description}
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground border-b border-border pb-2">The Challenge</h2>
              <p className="mb-6 leading-relaxed bg-muted/50 p-6 rounded-xl border border-border">
                {service.problem}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 mt-8">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-muted-foreground" /> What's Included
                  </h3>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-muted-foreground font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FadeIn delay={0.3}>
            <div className="sticky top-24 space-y-6">
              {/* Action Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-2">Hire Us</h3>
                <p className="text-sm text-muted-foreground mb-6">Ready to solve your challenges? Book a consultation today.</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-12 mb-3">
                  Book Consultation
                </Button>
                <Button variant="outline" className="w-full border-border hover:bg-muted text-foreground rounded-lg h-12">
                  Request Information
                </Button>
              </div>

              {/* Process */}
              {service.process.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Our Process</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border">
                    {service.process.map((step, i) => (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground shrink-0 relative z-10 mx-auto">
                          {i + 1}
                        </div>
                        <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded bg-muted/50 text-sm text-muted-foreground border border-border ml-4 md:ml-0 md:mr-4">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
