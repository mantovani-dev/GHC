import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { useCommunityLink } from "@/hooks/useCommunityLink";
import MobileDrawer from "@/components/layout/MobileDrawer";

import logoGhcWhite from "@/assets/logo-ghc-invisible-white.png";

const navLinks = [
  { href: "inicio", label: "header.inicio" },
  { href: "sobre", label: "header.sobre" },
  { href: "como-funciona", label: "header.comoFunciona" },
  { href: "cases", label: "header.cases" },
  { href: "contato", label: "header.contato" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const communityLink = useCommunityLink();

  /* Encolhe a pill e faz o scroll-spy no mesmo listener.
     Seção ativa = a última cujo topo já passou de 160px. */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      let active = navLinks[0].href;
      for (const { href } of navLinks) {
        const el = document.getElementById(href);
        if (el && el.getBoundingClientRect().top <= 160) active = href;
      }
      setActiveSection(active);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-padding-top: 110px em index.css já compensa a pill */
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[60] transition-[padding] duration-300",
          scrolled ? "py-2.5" : "py-3 min-[901px]:py-[18px]"
        )}
      >
        <div className="wrap">
          <div className={cn("navbar", scrolled && "navbar-small")}>
            {/* Logo */}
            <button
              onClick={() => scrollToSection("inicio")}
              className="flex shrink-0 items-center"
              aria-label="Ir para o início"
            >
              <img
                src={logoGhcWhite}
                alt="Global Hiring & Careers"
                className="block h-[26px]"
              />
            </button>

            {/* Nav desktop */}
            <nav className="hidden gap-0.5 min-[901px]:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "nav-link",
                    activeSection === link.href && "nav-link-on"
                  )}
                >
                  {t(link.label)}
                </button>
              ))}
            </nav>

            {/* Ações desktop */}
            <div className="hidden items-center gap-2 min-[901px]:flex">
              <LanguageToggle />
              <Button
                variant="orbita"
                size="orbita"
                onClick={() => window.open(communityLink, "_blank", "noopener,noreferrer")}
              >
                <MessageCircle />
                {t("header.comunidade")}
              </Button>
            </div>

            {/* Ações mobile */}
            <div className="flex items-center gap-2 min-[901px]:hidden">
              <LanguageToggle />
              <button
                className="menu-btn"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Abrir menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        communityLink={communityLink}
      />
    </>
  );
};

export default Header;
