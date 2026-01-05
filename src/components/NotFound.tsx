import { Link } from "@tanstack/react-router";
import { CloudOff, Home, ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
            <div className="relative p-6 bg-card border border-border rounded-2xl">
              <CloudOff className="h-16 w-16 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl font-bold text-foreground mb-2 tracking-tighter">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Check the URL or navigate back to safety.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Lost?{" "}
            <Link to="/docs" className="text-primary hover:underline">
              Check the documentation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
