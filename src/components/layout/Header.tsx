import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "react-i18next";
import { useCommunityLink } from "@/hooks/useCommunityLink";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { navLinks, sectionLinks, type NavLink } from "@/lib/nav";

import logoGhcWhite from "@/assets/logo-ghc-invisible-white.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const communityLink = useCommunityLink();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  /* Encolhe a pill e faz o scroll-spy no mesmo listener.
     Seção ativa = a última cujo topo já passou de 160px. */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!isHome) return;

      let active = sectionLinks[0].key;
      for (const { key, section } of sectionLinks) {
        const el = document.getElementById(section as string);
        if (el && el.getBoundingClientRect().top <= 160) active = key;
      }
      setActiveSection(active);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* scroll-padding-top: 110px em index.css já compensa a pill */
  const go = useCallback(
    (link: NavLink) => {
      setIsMenuOpen(false);

      if (link.path) {
        navigate(link.path);
        window.scrollTo({ top: 0 });
        return;
      }
      if (isHome) {
        document.getElementById(link.section as string)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(link.key);
      } else {
        navigate(`/#${link.section}`);
      }
    },
    [isHome, navigate]
  );

  const activeKey = isHome ? activeSection : pathname === "/vagas" ? "vagas" : "";

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
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0 })}
              className="flex shrink-0 items-center"
              aria-label="Ir para o início"
            >
              <img
                src={logoGhcWhite}
                alt="Global Hiring & Careers"
                className="block h-[26px]"
              />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden gap-0.5 min-[901px]:flex">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => go(link)}
                  className={cn("nav-link", activeKey === link.key && "nav-link-on")}
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
        activeKey={activeKey}
        onNavigate={go}
        communityLink={communityLink}
      />
    </>
  );
};

export default Header;
