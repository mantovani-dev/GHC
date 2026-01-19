import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Globe, Users, Briefcase } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  id?: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  return (
    <section id={id} className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-background shadow-xs">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">Recrutamento Internacional</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Sua carreira internacional
            <br />
            <span className="border-b-4 border-foreground">começa aqui</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            Conectamos brasileiros a oportunidades reais de trabalho na Polônia e Europa. 
            Sem promessas irreais, apenas caminhos viáveis com processos estruturados e acompanhamento humano.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
              className="shadow-md hover:shadow-lg hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all text-base"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Entrar na Comunidade WhatsApp
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.querySelector("#como-funciona");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all text-base"
            >
              Saiba Como Funciona
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="border-2 border-border bg-background p-4 md:p-6 shadow-xs">
              <Users className="w-6 h-6 mb-2" />
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Profissionais Conectados</div>
            </div>
            <div className="border-2 border-border bg-background p-4 md:p-6 shadow-xs">
              <Globe className="w-6 h-6 mb-2" />
              <div className="text-3xl md:text-4xl font-bold">15+</div>
              <div className="text-sm text-muted-foreground">Países de Destino</div>
            </div>
            <div className="border-2 border-border bg-background p-4 md:p-6 shadow-xs">
              <Briefcase className="w-6 h-6 mb-2" />
              <div className="text-3xl md:text-4xl font-bold">200+</div>
              <div className="text-sm text-muted-foreground">Vagas Preenchidas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
