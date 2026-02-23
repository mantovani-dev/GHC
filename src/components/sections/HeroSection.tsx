import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Globe, ShieldCheck, CheckCircle2, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { useTranslation } from "react-i18next";
import imgEmbarque from "@/assets/embarque.jpg";
import imgPolonia from "@/assets/polonia.png";
import imgAnderson from "@/assets/anderson.jpg";
import imgDepartures from "@/assets/departures.png";

const HERO_IMAGES = [
  imgEmbarque,
  imgPolonia,
  imgAnderson,
  imgDepartures,
];

interface HeroSectionProps {
  id?: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
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
    
    return () => {
      emblaApi.off("select", onSelect);
    };
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
    // {
    //   icon: Users,
    //   label: t("hero.pillars.people.label"),
    //   sub: t("hero.pillars.people.sub"),
    // }
  ];

  return (
    <section
      id={id}
      className="relative min-h-[100svh] w-full flex flex-col justify-center py-24 md:py-32 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex w-full h-full touch-pan-y">
          {HERO_IMAGES.map((img, index) => (
            <div 
              key={index} 
              className="relative min-w-0 shrink-0 grow-0 basis-full w-full h-full" 
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-[1] bg-background/60 dark:bg-background/80 backdrop-blur-[2px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className={cn(
          "max-w-4xl text-left transition-all duration-1000 transform mt-8 sm:mt-0",
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            <Globe className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider">
              {t("hero.tag")}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-foreground drop-shadow-sm">
            {t("hero.title")}
            <br />
            <span className="border-b-4 border-foreground inline-block mt-2">{t("hero.titleAccent")}</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground dark:text-muted-foreground max-w-2xl mb-8 leading-relaxed font-medium">
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
              className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all h-auto py-4 px-8 text-base w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("hero.cta")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById("como-funciona");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-background/80 backdrop-blur-sm font-bold border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all h-auto py-4 px-8 text-base w-full sm:w-auto"
            >
              {t("hero.learnMore")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

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