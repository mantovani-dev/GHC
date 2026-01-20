import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ModeToggle";

import logoGhc from "@/assets/logo-ghc-invisible.png";
import logoGhcWhite from "@/assets/logo-ghc-invisible-white.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const isManualScrolling = useRef(false);

  const navLinks = [
    { href: "inicio", label: "Início" },
    { href: "sobre", label: "Sobre" },
    { href: "como-funciona", label: "Como Funciona" },
    { href: "cases", label: "Cases" },
    { href: "contato", label: "Contato" },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      isManualScrolling.current = true;
      setActiveSection(id);
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 800);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Dinâmico: Troca baseada na classe .dark do Tailwind */}
          <button onClick={() => scrollToSection("inicio")} className="flex items-center">
            {/* Logo para Modo Claro */}
            <img 
              src={logoGhc} 
              alt="Global Hiring & Careers" 
              className="h-10 md:h-12 block dark:hidden transition-transform hover:scale-105" 
            />
            {/* Logo para Modo Escuro */}
            <img 
              src={logoGhcWhite} 
              alt="Global Hiring & Careers" 
              className="h-10 md:h-12 hidden dark:block transition-transform hover:scale-105" 
            />
          </button>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "px-4 py-2 text-sm font-bold transition-all relative rounded-none",
                    isActive
                      ? "text-primary bg-secondary/80"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute bottom-0 left-0 h-[3px] bg-primary transition-all duration-300",
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  )} />
                </button>
              );
            })}
          </nav>

          {/* Ações Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <Button
              onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
              className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Comunidade
            </Button>
          </div>

          {/* Ações Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <button
              className="p-2 border-2 border-border bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-border bg-background animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col p-2 gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "py-4 px-6 text-left font-bold transition-all border-2",
                      isActive
                        ? "bg-primary text-primary-foreground border-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                        : "border-transparent text-muted-foreground hover:bg-secondary/50"
                    )}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;