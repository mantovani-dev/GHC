import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Globe, ShieldCheck, CheckCircle2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";

import imgEmbarque   from "@/assets/embarque.jpg";
import imgPolonia    from "@/assets/polonia.png";
import imgAnderson   from "@/assets/anderson.jpg";
import imgDepartures from "@/assets/departures.png";

const HERO_IMAGES = [imgEmbarque, imgPolonia, imgAnderson, imgDepartures];

interface HeroSectionProps {
  id?: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 6500, stopOnInteraction: false }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    setIsLoaded(true);
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

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
    <section
      id={id}
      className="relative min-h-[100svh] w-full flex flex-col justify-center py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Carrossel de fundo */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex w-full h-full touch-pan-y">
          {HERO_IMAGES.map((img, index) => (
            <div key={index} className="relative min-w-0 shrink-0 grow-0 basis-full w-full h-full">
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                aria-hidden="true"
              />
              {/* Gradiente mais cinematográfico */}
              <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/35 to-background/90" />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay suave */}
      <div className="absolute inset-0 z-[1] bg-background/55 dark:bg-background/72 backdrop-blur-[1px] pointer-events-none" />

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div
          className={cn(
            "max-w-4xl text-left transition-all duration-1000 transform mt-8 sm:mt-0",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 mb-6 bg-background/90 shadow-xs rounded-sm">
            <Globe className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-foreground/80">
              {t("hero.tag")}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-5 tracking-tight text-foreground">
            {t("hero.title")}
            <br />
            <span className="border-b-[3px] border-foreground inline-block mt-2">
              {t("hero.titleAccent")}
            </span>
          </h1>

          {/* Descrição */}
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 dark:text-muted-foreground max-w-2xl mb-8 leading-relaxed font-medium">
            {t("hero.description")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Button
              size="lg"
              onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
              className="font-bold border border-border rounded-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(51,186,233,0.35)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.9)] dark:hover:shadow-[5px_5px_0px_0px_rgba(51,186,233,0.5)] active:shadow-none transition-all duration-200 h-auto py-3.5 px-7 text-sm sm:text-base w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 mr-2 shrink-0" />
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const el = document.getElementById("como-funciona");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-background/80 backdrop-blur-sm font-bold border border-border rounded-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(51,186,233,0.35)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.9)] dark:hover:shadow-[5px_5px_0px_0px_rgba(51,186,233,0.5)] active:shadow-none transition-all duration-200 h-auto py-3.5 px-7 text-sm sm:text-base w-full sm:w-auto"
            >
              {t("hero.learnMore")}
              <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </Button>
          </div>

          {/* Trust pillars com entrada escalonada */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {trustPillars.map((pillar, i) => (
              <div
                key={i}
                className={cn(
                  "border border-border bg-background/88 backdrop-blur-sm p-4 shadow-xs rounded-sm",
                  "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-sm transition-all duration-200",
                  "flex flex-col gap-2 group",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: isLoaded ? `${600 + i * 120}ms` : "0ms",
                  transitionDuration: "500ms",
                }}
              >
                <div className="w-8 h-8 rounded-sm bg-primary/8 flex items-center justify-center">
                  <pillar.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div className="text-sm font-bold leading-tight">{pillar.label}</div>
                <div className="text-xs text-muted-foreground leading-snug">{pillar.sub}</div>
              </div>
            ))}
          </div>

          {/* Indicadores do carrossel */}
          <div className="flex gap-1.5 mt-8">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-400",
                  i === currentIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-foreground/25 hover:bg-foreground/40"
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
