import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus, Search, FileCheck, Plane } from "lucide-react";
import { cn } from "@/lib/utils";

import { useTranslation } from "react-i18next";

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
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-secondary shadow-xs font-bold uppercase text-xs tracking-widest">
            <span>{t("howItWorks.tag")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("howItWorks.title")}
            <br />
            <span className="border-b-4 border-foreground">{t("howItWorks.titleAccent")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("howItWorks.description")}
          </p>
        </div>

        {/* Grelha de Passos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative border-2 border-border bg-background p-6 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all group flex flex-col h-full"
            >
              <div className="text-6xl font-bold text-secondary group-hover:text-primary transition-colors mb-4 opacity-50 select-none">
                {step.number}
              </div>
              <step.icon className="w-8 h-8 mb-4 text-primary shrink-0" />
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Chamada para Ação (CTA) */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
            className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all h-auto py-4 px-8 rounded-none"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {t("howItWorks.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;