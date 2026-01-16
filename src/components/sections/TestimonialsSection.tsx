import { Quote, MapPin, Briefcase } from "lucide-react";

interface TestimonialsSectionProps {
  id?: string;
}

const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const testimonials = [
    {
      name: "Anderson Inácio",
      location: "Polônia",
      role: "Desenvolvedor Full Stack",
      quote:
        "Sempre sonhei em trabalhar na Europa, mas não sabia por onde começar. Através da comunidade, encontrei uma vaga perfeita em Lisboa e todo o suporte que precisava. Hoje vivo meu sonho!",
      initials: "AI",
    },
    {
      name: "Carlos Augusto",
      location: "Áustria",
      role: "Engenheiro de Software",
      quote:
        "O processo foi muito mais simples do que imaginei. As vagas são reais, verificadas, e a equipe me ajudou em cada etapa. Em 6 meses eu já estava em Toronto.",
      initials: "CA",
    },
    {
      name: "André Mantovani",
      location: "Itália",
      role: "Designer UX/UI",
      quote:
        "Tentei por conta própria por anos sem sucesso. Quando entrei na comunidade, em 3 meses já tinha uma proposta firme. A diferença foi o acesso a vagas exclusivas e orientação de quem entende.",
      initials: "AM",
    },
    {
      name: "Letícia Cacique",
      location: "Inglaterra",
      role: "Analista de Dados",
      quote:
        "Além das vagas, o melhor é a rede de apoio. Conheci outros brasileiros que me ajudaram com dicas práticas sobre a mudança. Hoje faço o mesmo por quem está chegando.",
      initials: "LC",
    },
    {
      name: "Gabriel Borges",
      location: "Holanda",
      role: "Product Manager",
      quote:
        "A transparência foi o que me conquistou. Nada de promessas vazias, apenas informações reais e suporte genuíno. Recomendo para qualquer brasileiro que quer internacionalizar a carreira.",
      initials: "GB",
    },
    {
      name: "Filomena da Siva",
      location: "Reino Unido",
      role: "DevOps Engineer",
      quote:
        "Recebi várias propostas de vagas que se encaixavam no meu perfil. A curadoria é excelente — não perdi tempo com oportunidades que não faziam sentido pra mim.",
      initials: "FS",
    },
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-background shadow-xs">
            <span className="text-sm font-medium">Cases de Sucesso</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Histórias de quem
            <br />
            <span className="border-b-4 border-foreground">já realizou o sonho</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Conheça alguns dos profissionais brasileiros que conquistaram suas vagas 
            no exterior através da nossa comunidade.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border-2 border-border bg-background p-6 shadow-sm hover:shadow-md hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all flex flex-col"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 mb-4 text-muted-foreground" />

              {/* Quote Text */}
              <p className="text-foreground mb-6 flex-grow leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t-2 border-border">
                <div className="w-12 h-12 border-2 border-border flex items-center justify-center font-bold bg-secondary">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {testimonial.role}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
