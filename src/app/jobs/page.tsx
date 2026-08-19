import { getJobs } from "@/lib/data";
import { JobCard } from "@/components/ui/Cards";
import { EmptyState } from "@/components/ui/States";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/MotionWrapper";
import { Search } from "lucide-react";

export const metadata = {
  title: "Jobs | ListingHub",
  description: "Browse the latest job opportunities and open roles.",
};

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <FadeIn>
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Opportunities</h1>
            <p className="text-slate-400 text-lg">
              Find your next role. Browse opportunities across engineering, design, marketing, and more.
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>
      </FadeIn>

      {jobs.length === 0 ? (
        <FadeIn delay={0.2}>
          <EmptyState title="No jobs found" description="There are no open positions at the moment." />
        </FadeIn>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <StaggerItem key={job.id}>
              <JobCard job={job} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}
    </div>
  );
}
