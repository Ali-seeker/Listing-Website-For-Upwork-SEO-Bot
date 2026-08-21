export function HeroStats() {
  const stats = [
    { count: "1,240+", label: "Listings" },
    { count: "480+", label: "Verified experts" },
    { count: "150+", label: "Hiring companies" },
  ];

  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-10">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center lg:items-start">
          <span className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{stat.count}</span>
          <span className="text-sm font-medium text-muted-foreground mt-1">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
