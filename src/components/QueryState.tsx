import { Loader2, AlertCircle } from "lucide-react";

export const LoadingState = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-3">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

export const ErrorState = ({ message = "Something went wrong" }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
      <AlertCircle className="w-6 h-6 text-destructive" />
    </div>
    <p className="text-sm text-muted-foreground max-w-md">{message}</p>
  </div>
);
