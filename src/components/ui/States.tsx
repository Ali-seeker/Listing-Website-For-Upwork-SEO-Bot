import { AlertCircle, Loader2, SearchX } from "lucide-react";
import { Button } from "./button";

export function LoadingState({ message = "Loading content..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
      <h3 className="text-xl font-medium text-foreground">{message}</h3>
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
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-border rounded-2xl bg-card">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <SearchX className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" className="border-border hover:bg-muted">
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
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-destructive/20 rounded-2xl bg-destructive/5">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">{description}</p>
      {retry && (
        <Button onClick={retry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}
