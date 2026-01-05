import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "@tanstack/react-router";
import { Book, CloudLightning, Github, Heart, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, currentTheme, setUserTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  return (
    <div className="min-h-screen bg-background flex flex-col transition-colors duration-200 font-sans">
      <header className="fixed w-full z-50 transition-all duration-200 bg-background/40 backdrop-blur-md border-b border-border">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 bg-linear-to-br from-primary-600 to-primary-800 rounded-lg  shadow-lg shadow-primary-900/50">
              <CloudLightning className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Nubilus</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6 mr-4">
              <Link to="/docs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center">
                < Book className="w-4 h-4 mr-1.5" />
                Documentation
              </Link>
              <a href={import.meta.env.VITE_GIT_URL} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-4 h-4 mr-1.5" />
                GitHub
              </a>
              <a href={import.meta.env.VITE_DEV_URL} target="_blank" rel="noreferrer" className="flex items-center text-sm font-medium text-muted-foreground hover:text-pink-500 transition-colors">
                <Heart className="w-4 h-4 mr-1.5" />
                Sponsor
              </a>
            </div>
            
            <div className="flex items-center space-x-3 pl-6 border-l border-border">
               <button 
                onClick={() =>                 setUserTheme(currentTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
                onClick={() => setUserTheme(currentTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-muted-foreground"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-muted-foreground focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border shadow-xl animate-in slide-in-from-top-5 duration-200">
            <div className="px-4 py-6 space-y-4">
              <Link to="/docs" className="flex items-center text-base font-medium text-foreground hover:text-primary">
                <Book className="w-5 h-5 mr-3" /> Documentation
              </Link>
              <a href={import.meta.env.VITE_GIT_URL} target="_blank" rel="noreferrer" className="flex items-center text-base font-medium text-foreground hover:text-primary">
                <Github className="w-5 h-5 mr-3" /> GitHub
              </a>
              <a href={import.meta.env.VITE_DEV_URL} target="_blank" rel="noreferrer" className="flex items-center text-base font-medium text-foreground hover:text-pink-500">
                <Heart className="w-5 h-5 mr-3" /> Sponsor
              </a>
            </div>
          </div>
        )}
      </header>
      <main className="grow pt-16">{children}</main>
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <CloudLightning className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">Nubilus</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/docs" className="text-sm text-muted-foreground hover:text-primary">Documentation</Link>
            <a href={import.meta.env.VITE_GIT_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
            <a href={import.meta.env.VITE_DEV_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-pink-500 transition-colors"><Heart className="h-5 w-5" /></a>
          </div>
          <p className="text-sm text-muted-foreground">MIT License.</p>
        </div>
      </footer>
    </div>
  );
};