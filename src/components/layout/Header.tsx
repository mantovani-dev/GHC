import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";

import logoGhc      from "@/assets/logo-ghc-invisible.png";
import logoGhcWhite from "@/assets/logo-ghc-invisible-white.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled]         = useState(false);
  const isManualScrolling               = useRef(false);
  const { t } = useTranslation();

  const navLinks = [
    { href: "inicio",        label: "header.inicio"      },
    { href: "sobre",         label: "header.sobre"       },
    { href: "como-funciona", label: "header.comoFunciona"},
    { href: "cases",         label: "header.cases"       },
    { href: "contato",       label: "header.contato"     },
  ];

  /* Detecta scroll para aplicar fundo mais sólido */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection Observer para seção ativa */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );
    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isManualScrolling.current = true;
      setActiveSection(id);
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => { isManualScrolling.current = false; }, 900);
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm border-b border-border/40"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-15 md:h-18" style={{ height: "60px" }}>

          {/* Logo */}
          <button
            onClick={() => scrollToSection("inicio")}
            className="flex items-center shrink-0"
            aria-label="Ir para o início"
          >
            <img
              src={logoGhc}
              alt="Global Hiring & Careers"
              className="h-9 md:h-11 block dark:hidden transition-transform hover:scale-105"
            />
            <img
              src={logoGhcWhite}
              alt="Global Hiring & Careers"
              className="h-9 md:h-11 hidden dark:block transition-transform hover:scale-105"
            />
          </button>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "px-3.5 py-2 text-sm font-semibold transition-all relative rounded-sm",
                    isActive
                      ? "text-primary bg-secondary/80"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                  )}
                >
                  {t(link.label)}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full transition-all duration-300",
                      isActive ? "w-4/5 opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </button>
              );
            })}
          </nav>

          {/* Ações Desktop */}
          <div className="hidden md:flex items-center gap-2.5">
            <LanguageToggle />
            <ModeToggle />
            <Button
              onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
              size="sm"
              className="font-bold border border-border rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.85)] transition-all duration-200 dark:shadow-[2px_2px_0px_0px_rgba(51,186,233,0.3)] dark:hover:shadow-[4px_4px_0px_0px_rgba(51,186,233,0.45)]"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
              {t("header.comunidade")}
            </Button>
          </div>

          {/* Ações Mobile */}
          <div className="flex md:hidden items-center gap-1.5">
            <LanguageToggle />
            <ModeToggle />
            <button
              className="p-2 border border-border rounded-sm bg-background shadow-xs active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all duration-150"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen
                ? <X    className="w-5 h-5" />
                : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="border-t border-border/60 bg-background/98 backdrop-blur-sm">
            <nav className="flex flex-col p-2 gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "py-3.5 px-5 text-left font-semibold text-sm transition-all rounded-sm",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    )}
                  >
                    {t(link.label)}
                  </button>
                );
              })}
              <div className="pt-2 pb-1 px-5">
                <Button
                  onClick={() => {
                    window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank");
                    setIsMenuOpen(false);
                  }}
                  className="w-full font-bold border border-border rounded-sm shadow-xs transition-all"
                  size="sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-2" />
                  {t("header.comunidade")}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
