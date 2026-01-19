import { MessageCircle, Instagram, Linkedin, Youtube } from "lucide-react";
import logoGhc from "@/assets/logo-ghc-invisible-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: MessageCircle, href: "https://wa.me/5511940033692", label: "WhatsApp" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  const footerLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Cases", href: "#cases" },
    { label: "Contato", href: "#contato" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <img src={logoGhc} alt="Global Hiring & Careers" className="h-10 mb-4" />
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Conectando talentos brasileiros às melhores oportunidades de trabalho no exterior.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border-2 border-background/30 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-bold mb-4">Navegação</div>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-background/70 text-sm hover:text-background transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="font-bold mb-4">Contato</div>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <a
                href="https://wa.me/5511940033692"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-background transition-colors"
              >
                +55 11 94003-3692
              </a>
              <a
                href="mailto:contato@ghcareers.com.br"
                className="hover:text-background transition-colors"
              >
                atendimento@globalhiringcareers.com
              </a>
              <span>São Paulo, Brasil</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-background/50">
            © {currentYear} Global Hiring & Careers (GHC). Todos os direitos reservados.
          </div>
          <div className="flex gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-background transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
