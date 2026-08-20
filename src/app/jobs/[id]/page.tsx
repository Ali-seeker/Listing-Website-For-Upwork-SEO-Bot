import { getJobById } from "@/lib/data";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const job = await getJobById(params.id);
  return {
    title: job ? `${job.title} | ListingHub Jobs` : "Job Not Found",
    description: job?.description?.slice(0, 150) || "View job details.",
  };
}

export default async function JobDetailPage(props: Props) {
  const params = await props.params;
  const job = await getJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Link>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground border border-border">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {job.content_status}
                  </Badge>
                  {job.open_source_viable && (
                    <Badge variant="outline" className="border-border text-foreground">
                      Open Source Viable
                    </Badge>
                  )}
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Remote
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Posted {new Date(job.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-card border border-border rounded-2xl p-8 mt-8">
              <h2 className="text-xl font-semibold mb-6 text-foreground">Job Description</h2>
              <div className="prose prose-invert max-w-none prose-p:text-muted-foreground whitespace-pre-wrap">
                {job.description}
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
                <h3 className="text-lg font-semibold text-foreground mb-2">Apply Now</h3>
                <p className="text-sm text-muted-foreground mb-6">Take the next step in your career.</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-12 mb-3">
                  Submit Application
                </Button>
                {job.campaign_id && (
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Campaign: {job.campaign_id}
                  </p>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
