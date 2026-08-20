"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect, useRef, Suspense } from "react";

function SearchBarContent({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // Initialize state from URL params
  const [term, setTerm] = useState(searchParams.get("query")?.toString() || "");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Prevent debouncing on initial mount if term matches url
    if (term === (searchParams.get("query") || "")) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
          params.set("query", term);
        } else {
          params.delete("query");
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 400); 

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [term, pathname, router, searchParams]);

  return (
    <div className="relative w-full md:w-64">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isPending ? 'text-primary' : 'text-muted-foreground'}`} />
      <input 
        type="text" 
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder} 
        className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
      />
    </div>
  );
}

export function SearchBar({ placeholder = "Search..." }: { placeholder?: string }) {
  return (
    <Suspense fallback={
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input 
          type="text" 
          disabled
          placeholder={placeholder} 
          className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none transition-colors"
        />
      </div>
    }>
      <SearchBarContent placeholder={placeholder} />
    </Suspense>
  );
}
