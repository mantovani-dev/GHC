import { useEffect } from "react";
import { X, ArrowRight, MessageCircle, Instagram, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { navLinks, type NavLink } from "@/lib/nav";

import logoGhcWhite from "@/assets/logo-ghc-invisible-white.png";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  /** Chave do item ativo — seção da home ou rota atual. */
  activeKey: string;
  onNavigate: (link: NavLink) => void;
  communityLink: string;
}

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/agencia_ghc/", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/company/global-hiring-careers/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:atendimento@globalhiringcareers.com", label: "E-mail" },
];

const MobileDrawer = ({
  open,
  onClose,
  activeKey,
  onNavigate,
  communityLink,
}: MobileDrawerProps) => {
  const { t } = useTranslation();

  /* Trava o scroll do body e fecha no Esc */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // `visibility: hidden` no .drawer já tira os links do fluxo de foco quando fechado
  return (
    <div className={cn("drawer", open && "drawer-open")} aria-hidden={!open}>
      {/* Topo: logo + fechar */}
      <div className="mb-[38px] flex items-center justify-between">
        <img src={logoGhcWhite} alt="Global Hiring & Careers" className="block h-[26px]" />
        <button className="menu-btn" onClick={onClose} aria-label="Fechar menu">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-0.5">
        {navLinks.map((link) => (
          <button
            key={link.key}
            onClick={() => onNavigate(link)}
            className={cn("drawer-link", activeKey === link.key && "drawer-link-on")}
          >
            {t(link.label)}
            <ArrowRight className="h-[18px] w-[18px] text-accent/65" />
          </button>
        ))}
      </nav>

      {/* Rodapé: CTA + idioma + sociais */}
      <div className="mt-auto grid gap-3.5">
        <Button
          variant="orbita"
          size="orbitaLg"
          className="w-full justify-center"
          onClick={() => {
            window.open(communityLink, "_blank", "noopener,noreferrer");
            onClose();
          }}
        >
          <MessageCircle />
          {t("hero.cta")}
        </Button>

        <div className="flex items-center justify-center gap-2.5">
          <LanguageToggle />
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="grid h-[42px] w-[42px] place-items-center rounded-full border border-white/[0.12] text-foreground/60 transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <social.icon className="h-[17px] w-[17px]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
