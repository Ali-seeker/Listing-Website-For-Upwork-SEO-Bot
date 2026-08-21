import { Briefcase, Code, Sparkles, Box } from "lucide-react";

interface ListingPreview {
  id: string;
  title: string;
  meta: string;
  type: "job" | "product" | "service";
}

const mockListings: ListingPreview[] = [
  { id: "1", title: "Senior React Developer", meta: "Remote · Full-time", type: "job" },
  { id: "2", title: "Supabase Starter Kit", meta: "SaaS Boilerplate", type: "product" },
  { id: "3", title: "UI/UX Design Audit", meta: "Fixed Price · 1 week", type: "service" },
  { id: "4", title: "Full-Stack Engineer", meta: "New York · Hybrid", type: "job" },
  { id: "5", title: "Next.js Analytics", meta: "Analytics Tool", type: "product" },
];

export function HeroListingsRail() {
  // We duplicate the list once to create a seamless loop
  const loopListings = [...mockListings, ...mockListings];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "job":
        return {
          icon: <Briefcase className="w-4 h-4 text-indigo-500" />,
          badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
          bg: "bg-indigo-500/10",
        };
      case "product":
        return {
          icon: <Box className="w-4 h-4 text-cyan-500" />,
          badge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
          bg: "bg-cyan-500/10",
        };
      case "service":
        return {
          icon: <Code className="w-4 h-4 text-amber-500" />,
          badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
          bg: "bg-amber-500/10",
        };
      default:
        return {
          icon: <Sparkles className="w-4 h-4" />,
          badge: "bg-muted text-muted-foreground border-border",
          bg: "bg-muted",
        };
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none h-[300px] sm:h-[400px] lg:h-[500px] pointer-events-auto">
      {/* AI Matched Badge attached to the rail */}
      <div className="absolute -top-4 -left-4 sm:-left-6 z-20 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border shadow-md">
          <Sparkles className="w-4 h-4 text-cyan-500" />
          <span className="text-xs font-semibold text-foreground">AI-matched for you</span>
        </div>
      </div>

      {/* Fade Mask */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="h-full w-full relative overflow-hidden pointer-events-auto">
          {/* Scrolling Container */}
          <div className="flex flex-col gap-4 animate-[scroll-vertical_20s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
            {loopListings.map((listing, idx) => {
              const styles = getTypeStyles(listing.type);
              
              return (
                <div 
                  key={`${listing.id}-${idx}`}
                  className="bg-card border border-border/80 dark:border-border/50 shadow-sm rounded-xl p-4 flex items-start gap-4 transition-all hover:border-primary/30 hover:shadow-md cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${styles.bg}`}>
                    {styles.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-foreground text-sm truncate">{listing.title}</h4>
                    <p className="text-muted-foreground text-xs truncate mt-0.5">{listing.meta}</p>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-medium border uppercase tracking-wider ${styles.badge}`}>
                    {listing.type}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
