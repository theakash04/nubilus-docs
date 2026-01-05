import { Link, useLocation } from "@tanstack/react-router";
import { Book, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

interface DocItem {
  slug: string;
  title: string;
  order: number;
}

interface DocsLayoutProps {
  children: React.ReactNode;
  docs: DocItem[];
  currentSlug?: string;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ children, docs, currentSlug }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const sortedDocs = [...docs].sort((a, b) => a.order - b.order);

  const currentIndex = sortedDocs.findIndex((doc) => doc.slug === currentSlug);
  const prevDoc = currentIndex > 0 ? sortedDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden p-4 bg-primary text-primary-foreground rounded-full shadow-lg"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-16 left-0 z-50 md:z-0
          w-72 h-[calc(100vh-4rem)] 
          bg-background border-r border-border
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          overflow-y-auto
        `}
      >
        <nav className="p-6">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Documentation
          </h2>
          <ul className="space-y-1">
            {sortedDocs.map((doc) => {
              const isActive = currentSlug === doc.slug || 
                (doc.slug === "index" && location.pathname === "/docs");
              return (
                <li key={doc.slug}>
                  <Link
                    to={doc.slug === "index" ? "/docs" : "/docs/$slug"}
                    params={doc.slug === "index" ? undefined : { slug: doc.slug }}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                      transition-colors
                      ${isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Book className="h-4 w-4 shrink-0" />
                    {doc.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="mx-auto px-6 py-10 max-w-500">
          {children}

          {/* Pagination */}
          {(prevDoc || nextDoc) && (
            <div className="mt-16 pt-8 border-t border-border flex justify-between items-center gap-4">
              {prevDoc ? (
                <Link
                  to={prevDoc.slug === "index" ? "/docs" : "/docs/$slug"}
                  params={prevDoc.slug === "index" ? undefined : { slug: prevDoc.slug }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{prevDoc.title}</span>
                </Link>
              ) : <div />}
              {nextDoc ? (
                <Link
                  to={nextDoc.slug === "index" ? "/docs" : "/docs/$slug"}
                  params={nextDoc.slug === "index" ? undefined : { slug: nextDoc.slug }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>{nextDoc.title}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : <div />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
