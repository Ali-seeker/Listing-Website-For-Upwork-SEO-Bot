"use client";

import { useState } from "react";
import { Search } from "lucide-react";
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
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input 
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for products, services, or jobs..." 
          className="w-full bg-background/50 border border-border rounded-lg pl-10 pr-4 h-12 text-foreground focus:outline-none focus:border-primary/50 transition-colors backdrop-blur-sm"
        />
      </div>
      <button 
        type="submit"
        className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 h-12 w-full sm:w-auto font-medium transition-all duration-300 whitespace-nowrap shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.6)] hover:-translate-y-0.5"
      >
        Search
      </button>
    </form>
  );
}
