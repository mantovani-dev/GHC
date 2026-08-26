import { MessageCircle, Instagram, Linkedin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCommunityLink } from "@/hooks/useCommunityLink";
import { navLinks, type NavLink } from "@/lib/nav";

import logoGhc from "@/assets/logo-ghc-invisible-white.png";

const EMAIL = "atendimento@globalhiringcareers.com";

const Footer = () => {
  const { t } = useTranslation();
  const communityLink = useCommunityLink();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: MessageCircle, href: communityLink, label: "WhatsApp" },
    { icon: Instagram, href: "https://www.instagram.com/agencia_ghc/", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/global-hiring-careers/", label: "LinkedIn" },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const go = (link: NavLink) => {
    if (link.path) {
      navigate(link.path);
      window.scrollTo({ top: 0 });
    } else if (pathname === "/") {
      document.getElementById(link.section as string)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${link.section}`);
    }
  };

  return (
    <footer className="orbita-footer">
      <div className="wrap">
        <div className="fgrid">
          {/* Marca */}
          <div>
            <img
              src={logoGhc}
              alt="Global Hiring & Careers"
              className="block h-[38px]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <p>{t("footer.description")}</p>
            <div className="soc">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <div className="fh">{t("footer.nav")}</div>
            <nav className="fl">
              {navLinks.map((link) => (
                <button key={link.key} onClick={() => go(link)} className="transition-colors">
                  {t(link.label)}
                </button>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div>
            <div className="fh">{t("footer.labels.contact")}</div>
            <div className="fl">
              <a href={`mailto:${EMAIL}`} className="break-all transition-colors">
                {EMAIL}
              </a>
              <span>Av. Salgado Filho, 2120</span>
              <span>Guarulhos, São Paulo - Brasil</span>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="fbot">
          <span>
            © {currentYear} Global Hiring &amp; Careers (GHC). {t("footer.rights")}
          </span>
          <span className="flex gap-[22px]">
            <a href="#" className="transition-colors hover:text-accent">
              {t("footer.privacy")}
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              {t("footer.terms")}
            </a>
          </span>
        </div>

        {/* Créditos do desenvolvedor */}
        <div className="mt-6 flex flex-col items-center justify-center border-t border-white/[0.06] pt-6">
          <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.2em] text-foreground/25">
            {t("footer.developed")}
          </p>
          <div className="group cursor-default select-none">
            <span className="font-mono text-xs tracking-tighter text-foreground/30 transition-colors duration-500 group-hover:text-accent">
              {"</"}saint<span className="text-foreground/25 group-hover:text-accent">♱</span>
              code{">"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
