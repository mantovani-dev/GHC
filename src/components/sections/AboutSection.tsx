import { Target, Eye, Heart, Users, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "@/components/ui/animate-in";
import { GlassCard } from "@/components/ui/glass-card";

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
    <section id={id} className="wrap sec">
      {/* Cabeçalho */}
      <AnimateIn>
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          {t("about.tag")}
        </span>

        <h2 className="h2-orbita mt-[22px]">
          {t("about.title")}
          <br />
          <b className="grad">{t("about.titleAccent")}</b>
        </h2>

        <p className="lead-orbita mt-[26px] max-w-[720px]">{t("about.description1")}</p>
        <p className="lead-orbita mt-[18px] max-w-[720px]">{t("about.description2")}</p>
      </AnimateIn>

      {/* Missão e Visão */}
      <AnimateIn className="duo">
        <GlassCard hover>
          <div className="ico">
            <Target className="h-[19px] w-[19px]" />
          </div>
          <h3>{t("about.mission.title")}</h3>
          <p>{t("about.mission.text")}</p>
        </GlassCard>

        <GlassCard hover>
          <div className="ico">
            <Eye className="h-[19px] w-[19px]" />
          </div>
          <h3>{t("about.vision.title")}</h3>
          <p>{t("about.vision.text")}</p>
        </GlassCard>
      </AnimateIn>

      {/* Valores */}
      <AnimateIn className="quad">
        {values.map((value, index) => (
          <GlassCard key={index} hover>
            <div className="ico">
              <value.icon className="h-[17px] w-[17px]" />
            </div>
            <h4>{value.title}</h4>
            <p>{value.description}</p>
          </GlassCard>
        ))}
      </AnimateIn>
    </section>
  );
};

export default AboutSection;
