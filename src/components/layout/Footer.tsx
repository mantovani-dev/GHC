import { MessageCircle, Instagram, Linkedin, Youtube, Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import logoGhc from "@/assets/logo-ghc-invisible-white.png";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: MessageCircle, href: "https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", label: "WhatsApp" },
    { icon: Instagram, href: "https://instagram.com/globalhiringcareers?igsh=dDlwNGZjY2kzczl5", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/global-hiring-careers/", label: "LinkedIn" },
  ];

  const footerLinks = [
    { label: t("footer.labels.home"), href: "#inicio" },
    { label: t("footer.labels.about"), href: "#sobre" },
    { label: t("footer.labels.works"), href: "#como-funciona" },
    { label: t("footer.labels.cases"), href: "#cases" },
    { label: t("footer.labels.contact"), href: "#contato" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black text-white py-8 md:py-10 border-t-2 border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Marca / Logo */}
          <div>
            <img 
              src={logoGhc} 
              alt="Global Hiring & Careers" 
              className="h-10 mb-3" 
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t("footer.description")}
            </p>
            {/* Links Sociais */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border-2 border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div>
            <div className="font-bold mb-3 text-white">{t("footer.nav")}</div>
            <nav className="flex flex-col gap-1.5">
              {footerLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-300 text-sm hover:text-white transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div>
            <div className="font-bold mb-3 text-white">{t("footer.labels.contact")}</div>
            <div className="flex flex-col gap-1.5 text-sm text-gray-300">
              {/* <a
                href="https://wa.me/5511940033692"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                +55 11 94003-3692
              </a> */}
              <a
                href="mailto:contato@ghcareers.com.br"
                className="hover:text-white transition-colors"
              >
                atendimento@globalhiringcareers.com
              </a>
              <span className="text-gray-400">São Paulo, Brasil</span>
            </div>
          </div>
        </div>

        {/* Barra Inferior */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="text-sm text-gray-500">
            © {currentYear} Global Hiring & Careers (GHC). {t("footer.rights")}
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.privacy")}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t("footer.terms")}
            </a>
          </div>
        </div>

        {/* Créditos do Desenvolvedor */}
        <div className="flex flex-col items-center justify-center pt-6 border-t border-white/5">
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-1 font-medium">
            {t("footer.developed")}
          </p>
          <div className="group cursor-default select-none">
            <span className="font-mono text-xs tracking-tighter text-gray-500 group-hover:text-primary transition-colors duration-500">
              {"</"}saint<span className="text-gray-600 group-hover:text-primary">♱</span>code{">"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;