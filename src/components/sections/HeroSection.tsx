import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Globe, ShieldCheck, CheckCircle2, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const HERO_IMAGES = [
  "src/assets/embarque.jpg",
  "src/assets/polonia.png",
  "src/assets/anderson.jpg",
  "src/assets/departures.png",
];

interface HeroSectionProps {
  id?: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const trustPillars = [
    {
      icon: ShieldCheck,
      label: t("hero.pillars.security.label"),
      sub: t("hero.pillars.security.sub"),
    },
    {
      icon: MapPin,
      label: t("hero.pillars.support.label"),
      sub: t("hero.pillars.support.sub"),
    },
    {
      icon: CheckCircle2,
      label: t("hero.pillars.verified.label"),
      sub: t("hero.pillars.verified.sub"),
    },
  ];

  return (
    <section id={id} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Background Carrossel com Efeito Crossfade */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-center bg-cover"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${img})`,
              opacity: index === currentImage ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-background/50 dark:bg-background/80 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl text-left">
          {/* Badge de Destaque Superior */}
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold uppercase tracking-wider">
              {t("hero.tag")}
            </span>
          </div>

          {/* Headline Principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight text-foreground">
            {t("hero.title")}
            <br />
            <span className="border-b-4 border-foreground">{t("hero.titleAccent")}</span>
          </h1>

          {/* Descrição Principal */}
          <p className="text-lg md:text-xl text-foreground dark:text-muted-foreground max-w-2xl mb-8 leading-relaxed font-medium">
            {t("hero.description")}
          </p>

          {/* Ações e Botões de Chamada (CTA) */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
              className="bg-primary text-primary-foreground font-bold border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all h-auto py-4 px-8 text-base flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("hero.cta")}
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("como-funciona");
                if (element) {
                   element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-background/80 backdrop-blur-sm text-foreground font-bold border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all h-auto py-4 px-8 text-base flex items-center justify-center"
            >
              {t("hero.learnMore")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Grade de Pilares de Confiança */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {trustPillars.map((pillar, i) => (
              <div 
                key={i} 
                className="border-2 border-border bg-background/90 backdrop-blur-sm p-4 md:p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col gap-2 group"
              >
                <pillar.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-lg font-bold leading-tight">{pillar.label}</div>
                <div className="text-xs text-muted-foreground leading-snug">{pillar.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;