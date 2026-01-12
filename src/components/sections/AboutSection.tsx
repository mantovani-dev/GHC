import { Target, Eye, Heart, Award, Globe, Users } from "lucide-react";

interface AboutSectionProps {
  id?: string;
}

const AboutSection = ({ id }: AboutSectionProps) => {
  const values = [
    {
      icon: Globe,
      title: "Transparência",
      description: "Informações claras sobre vagas, processos e expectativas desde o primeiro contato.",
    },
    {
      icon: Heart,
      title: "Compromisso",
      description: "Tratamos cada candidato como único, oferecendo suporte personalizado em toda a jornada.",
    },
    {
      icon: Award,
      title: "Responsabilidade",
      description: "Trabalhamos apenas com empresas sérias e oportunidades reais verificadas.",
    },
    {
      icon: Users,
      title: "Realismo",
      description: "Criamos uma rede de apoio entre brasileiros que já vivem no exterior.",
    },
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-background shadow-xs">
            <span className="text-sm font-medium">Sobre Nós</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Transformando sonhos em
            <br />
            <span className="border-b-4 border-foreground">carreiras globais</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A GHC - Global Hiring & Careers surgiu a partir da experiência prática com recrutamento internacional e da necessidade de estruturar um processo profissional, transparente e responsável para brasileiros que desejam trabalhar no exterior.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A empresa nasceu com o propósito de conectar pessoas a oportunidades reais de trabalho fora do Brasil, oferecendo clareza sobre etapas, responsabilidades e limites legais, evitando promessas irreais ou atalhos inseguros.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="border-2 border-border bg-background p-8 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all">
            <Target className="w-10 h-10 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Nossa Missão</h3>
            <p className="text-muted-foreground leading-relaxed">
              Conectar pessoas a oportunidades reais de trabalho no exterior, por meio de
              processos claros, acompanhamento humano e parcerias confiáveis.
            </p>
          </div>
          <div className="border-2 border-border bg-background p-8 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all">
            <Eye className="w-10 h-10 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Nossa Visão</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ser referência em recrutamento internacional para brasileiros e latino-americanos, reconhecida
              pela transparência, credibilidade e estrutura profissional.

            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="border-2 border-border bg-background p-6 shadow-xs hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              <value.icon className="w-8 h-8 mb-4" />
              <h4 className="text-lg font-bold mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
