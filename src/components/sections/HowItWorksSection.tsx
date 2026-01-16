import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus, Search, FileCheck, Plane } from "lucide-react";

interface HowItWorksSectionProps {
  id?: string;
}

const HowItWorksSection = ({ id }: HowItWorksSectionProps) => {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Captação do Candidato",
      description:
        "Acesso à nossa comunidade onde as vagas reais são divulgadas e explicadas.",
    },
    {
      number: "02",
      icon: Search,
      title: "Triagem de Perfil",
      description:
        "Análise técnica do seu perfil para entender habilidades e compatibilidade com as vagas.",
    },
    {
      number: "03",
      icon: FileCheck,
      title: "Direcionamento",
      description:
        "Intermediação com empregadores parceiros e organização do fluxo documental.",
    },
    {
      number: "04",
      icon: Plane,
      title: "Embarque",
      description:
        "Preparação final e orientações pré-embarque para sua nova jornada na Europa.",
    },
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-secondary shadow-xs">
            <span className="text-sm font-medium">Como Funciona</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Seu caminho para uma
            <br />
            <span className="border-b-4 border-foreground">carreira internacional</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nosso processo é simples e transparente. Acompanhe os passos abaixo e
            entenda como podemos ajudar você a conquistar sua vaga no exterior.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative border-2 border-border bg-background p-6 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all group"
            >
              <div className="text-6xl font-bold text-secondary group-hover:text-accent transition-colors mb-4">
                {step.number}
              </div>
              <step.icon className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
            className="shadow-md hover:shadow-lg hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Comece Agora — Entre na Comunidade
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
