import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus, Search, FileCheck, Plane } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "@/components/ui/animate-in";

interface HowItWorksSectionProps {
  id?: string;
}

const HowItWorksSection = ({ id }: HowItWorksSectionProps) => {
  const { t } = useTranslation();

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
    <section id={id} className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Cabeçalho */}
        <AnimateIn animation="fade-up" className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 mb-5 bg-secondary shadow-xs rounded-sm font-bold uppercase text-xs tracking-widest">
            <span>{t("howItWorks.tag")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-5 tracking-tight leading-tight">
            {t("howItWorks.title")}
            <br />
            <span className="border-b-[3px] border-foreground">{t("howItWorks.titleAccent")}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("howItWorks.description")}
          </p>
        </AnimateIn>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-12">
          {steps.map((step, index) => (
            <AnimateIn
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="relative border border-border bg-background p-5 md:p-6 shadow-xs rounded-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 group flex flex-col h-full">
                {/* Linha conectora (só no desktop, exceto último) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[3.25rem] left-full w-full h-px bg-border z-10 -translate-y-px pointer-events-none" style={{ width: "calc(100% - 100%)", left: "100%", transform: "translateX(0)" }} />
                )}

                {/* Número de fundo */}
                <div className="text-5xl md:text-6xl font-black text-muted-foreground/15 group-hover:text-accent/25 transition-colors duration-300 mb-3 select-none leading-none">
                  {step.number}
                </div>

                {/* Ícone */}
                <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors duration-200">
                  <step.icon className="w-4.5 h-4.5 text-primary" style={{ width: "18px", height: "18px" }} />
                </div>

                <h3 className="text-base md:text-lg font-bold mb-2 leading-tight">{step.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed flex-1">
                  {step.description}
                </p>

                {/* Indicador de step no rodapé */}
                <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-1.5">
                  <div className="h-1 w-6 rounded-full bg-primary/70" />
                  <div className="h-1 flex-1 rounded-full bg-border" />
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn animation="fade-up" delay={200} className="text-center">
          <Button
            size="lg"
            onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
            className="font-bold border border-border rounded-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(51,186,233,0.35)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.9)] dark:hover:shadow-[5px_5px_0px_0px_rgba(51,186,233,0.5)] transition-all duration-200 h-auto py-3.5 px-8"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {t("howItWorks.cta")}
          </Button>
        </AnimateIn>

      </div>
    </section>
  );
};

export default HowItWorksSection;
