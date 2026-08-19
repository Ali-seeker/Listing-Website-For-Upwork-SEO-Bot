import { AlertCircle, Loader2, SearchX } from "lucide-react";
import { Button } from "./button";

export function LoadingState({ message = "Loading content..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
      <h3 className="text-xl font-medium text-slate-200">{message}</h3>
    </div>
  );
}

export function EmptyState({ 
  title = "No results found", 
  description = "We couldn't find any content matching your request.",
  actionLabel,
  onAction
}: { 
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/50">
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 max-w-md mx-auto mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="border-slate-700 hover:bg-slate-800">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({ 
  title = "Something went wrong", 
  description = "An error occurred while loading this content.",
  retry
}: { 
  title?: string;
  description?: string;
  retry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-slate-800 rounded-2xl bg-red-950/10">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-slate-400 max-w-md mx-auto mb-6">{description}</p>
      {retry && (
        <Button onClick={retry} className="bg-slate-800 hover:bg-slate-700 text-slate-200">
          Try Again
        </Button>
      )}
    </div>
  );
}
