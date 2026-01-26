import React from "react";
import { Target, Eye, Heart, Users, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

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
    <section id={id} className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-background shadow-xs">
            <span className="text-sm font-medium">{t("about.tag")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("about.title")}
            <br />
            <span className="border-b-4 border-foreground">{t("about.titleAccent")}</span>
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.description1")}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.description2")}
            </p>
          </div>
        </div>

        {/* Missão e Visão */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="border-2 border-border bg-background p-8 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all">
            <Target className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-3">{t("about.mission.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.mission.text")}
            </p>
          </div>
          <div className="border-2 border-border bg-background p-8 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all">
            <Eye className="w-10 h-10 mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-3">{t("about.vision.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("about.vision.text")}
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="border-2 border-border bg-background p-6 shadow-xs hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col"
            >
              <value.icon className="w-8 h-8 mb-4 text-primary shrink-0" />
              <h4 className="text-lg font-bold mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground leading-snug">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;