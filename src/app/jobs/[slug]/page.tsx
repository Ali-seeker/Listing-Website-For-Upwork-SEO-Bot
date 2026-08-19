import { getJobBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animations/MotionWrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, Calendar, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const job = await getJobBySlug(params.slug);
  return {
    title: job ? `${job.title} | ListingHub Jobs` : "Job Not Found",
    description: job?.shortDesc || "View job details.",
  };
}

export default async function JobDetailPage(props: Props) {
  const params = await props.params;
  const job = await getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Link>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                    {job.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Remote
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xl text-slate-300 font-medium mb-8">
              {job.shortDesc}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-6 text-white">Job Description</h2>
              <div className="prose prose-invert max-w-none prose-p:text-slate-300 whitespace-pre-wrap">
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
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Apply Now</h3>
                <p className="text-sm text-emerald-400/80 mb-6">Take the next step in your career.</p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-12 mb-3">
                  Submit Application
                </Button>
                {job.source && (
                  <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-200 rounded-lg h-12">
                    View on {job.source} <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>

              {/* Skills required */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
