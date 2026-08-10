import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus, Search, FileCheck, Plane } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "@/components/ui/animate-in";
import { useCommunityLink } from "@/hooks/useCommunityLink";

interface HowItWorksSectionProps {
  id?: string;
}

const HowItWorksSection = ({ id }: HowItWorksSectionProps) => {
  const { t } = useTranslation();
  const communityLink = useCommunityLink();

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: t("howItWorks.steps.step1.title"),
      description: t("howItWorks.steps.step1.description"),
    },
    {
      number: "02",
      icon: Search,
      title: t("howItWorks.steps.step2.title"),
      description: t("howItWorks.steps.step2.description"),
    },
    {
      number: "03",
      icon: FileCheck,
      title: t("howItWorks.steps.step3.title"),
      description: t("howItWorks.steps.step3.description"),
    },
    {
      number: "04",
      icon: Plane,
      title: t("howItWorks.steps.step4.title"),
      description: t("howItWorks.steps.step4.description"),
    },
  ];

  return (
    <section id={id} className="wrap sec pt-0">
      {/* Cabeçalho */}
      <AnimateIn>
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          {t("howItWorks.tag")}
        </span>

        <h2 className="h2-orbita mt-[22px]">
          {t("howItWorks.title")} <b className="grad">{t("howItWorks.titleAccent")}</b>
        </h2>

        <p className="lead-orbita mt-[26px] max-w-[560px]">{t("howItWorks.description")}</p>
      </AnimateIn>

      {/* Timeline: nós sobre a linha ciano no desktop, trilha vertical em ≤900px */}
      <AnimateIn className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="node">
              <step.icon className="h-5 w-5" />
            </div>
            <div className="step-n">
              {t("howItWorks.stepLabel")} {step.number}
            </div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </AnimateIn>

      <AnimateIn className="mt-14 text-center">
        <Button
          variant="orbita"
          size="orbitaLg"
          className="max-[600px]:w-full max-[600px]:justify-center"
          onClick={() => window.open(communityLink, "_blank", "noopener,noreferrer")}
        >
          <MessageCircle />
          {t("howItWorks.cta")}
        </Button>
      </AnimateIn>
    </section>
  );
};

export default HowItWorksSection;
