import React from "react";
import { Target, Eye, Heart, Users, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "@/components/ui/animate-in";

interface AboutSectionProps {
  id?: string;
}

const AboutSection = ({ id }: AboutSectionProps) => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Eye,
      title: t("about.values.transparency.title"),
      description: t("about.values.transparency.description"),
    },
    {
      icon: Heart,
      title: t("about.values.commitment.title"),
      description: t("about.values.commitment.description"),
    },
    {
      icon: ShieldCheck,
      title: t("about.values.responsibility.title"),
      description: t("about.values.responsibility.description"),
    },
    {
      icon: Users,
      title: t("about.values.realism.title"),
      description: t("about.values.realism.description"),
    },
  ];

  return (
    <section id={id} className="py-16 md:py-28 bg-secondary dot-pattern">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Cabeçalho */}
        <AnimateIn animation="fade-up" className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 mb-5 bg-background shadow-xs rounded-sm">
            <span className="text-xs font-semibold text-muted-foreground">{t("about.tag")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-5 tracking-tight leading-tight">
            {t("about.title")}
            <br />
            <span className="border-b-[3px] border-foreground">{t("about.titleAccent")}</span>
          </h2>
          <div className="space-y-3">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("about.description1")}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("about.description2")}
            </p>
          </div>
        </AnimateIn>

        {/* Missão e Visão */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5 mb-10 md:mb-12">
          <AnimateIn animation="slide-left" delay={100}>
            <div className="border border-border bg-background p-6 md:p-8 shadow-sm rounded-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 h-full">
              <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("about.mission.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {t("about.mission.text")}
              </p>
            </div>
          </AnimateIn>
          <AnimateIn animation="slide-right" delay={100}>
            <div className="border border-border bg-background p-6 md:p-8 shadow-sm rounded-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 h-full">
              <div className="w-10 h-10 rounded-sm bg-primary/8 flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t("about.vision.title")}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {t("about.vision.text")}
              </p>
            </div>
          </AnimateIn>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {values.map((value, index) => (
            <AnimateIn
              key={index}
              animation="fade-up"
              delay={index * 80}
            >
              <div className="border border-border bg-background p-4 md:p-6 shadow-xs rounded-sm hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col h-full group">
                <div className="w-8 h-8 rounded-sm bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors duration-200">
                  <value.icon className="w-4 h-4 text-primary" />
                </div>
                <h4 className="text-sm md:text-base font-bold mb-2">{value.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-snug">
                  {value.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
