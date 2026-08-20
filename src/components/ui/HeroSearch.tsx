"use client";

import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSearch() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      router.push(`/products?query=${encodeURIComponent(term.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full group/search">
      <div className="relative flex-grow">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within/search:text-primary transition-colors" />
        <input 
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for products, services, or jobs..." 
          className="w-full bg-background/60 border border-border/50 rounded-xl pl-12 pr-4 h-14 text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all backdrop-blur-md shadow-inner"
        />
      </div>
      <button 
        type="submit"
        className="group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 h-14 w-full sm:w-auto font-semibold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5"
      >
        Search
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
