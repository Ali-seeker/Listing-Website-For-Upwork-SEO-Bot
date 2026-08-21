"use client";

import { useState } from "react";
import { Search, ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Category = "Products" | "Services" | "Jobs" | "Blog";

export function HeroSearch() {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState<Category>("Products");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const route = category.toLowerCase(); // "products", "services", "jobs"
    if (term.trim()) {
      router.push(`/${route}?query=${encodeURIComponent(term.trim())}`);
    } else {
      router.push(`/${route}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Category Chips */}
      <div className="flex items-center gap-2 px-1">
        {(["Products", "Services", "Jobs", "Blog"] as Category[]).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border shadow-sm ${
              category === cat 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-card text-muted-foreground border-border/80 dark:border-border/50 hover:border-primary/50 hover:text-foreground"
            }`}
            aria-pressed={category === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full group/search">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within/search:text-primary transition-colors" />
          <input 
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder={`Search for ${category.toLowerCase()}...`} 
            className="w-full bg-background/60 border border-border/80 dark:border-border/50 rounded-xl pl-12 pr-4 h-14 text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all backdrop-blur-md shadow-inner"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            type="submit"
            className="flex-1 sm:flex-none group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 h-14 font-semibold text-base transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5"
          >
            Search
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
}
