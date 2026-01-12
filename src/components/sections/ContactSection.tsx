import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id }: ContactSectionProps) => {
  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+55 11 99999-9999",
      description: "Resposta em até 24h",
      action: () => window.open("https://wa.me/5511999999999", "_blank"),
    },
    {
      icon: Mail,
      title: "E-mail",
      value: "contato@globaltalent.com.br",
      description: "Para parcerias e empresas",
      action: () => window.open("mailto:contato@globaltalent.com.br", "_blank"),
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      value: "Segunda a Sexta",
      description: "9h às 18h (horário de Brasília)",
    },
    {
      icon: MapPin,
      title: "Localização",
      value: "São Paulo, Brasil",
      description: "Atendemos todo o Brasil",
    },
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Text */}
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-secondary shadow-xs">
              <span className="text-sm font-medium">Contato</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Pronto para dar o
              <br />
              <span className="border-b-4 border-foreground">próximo passo?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Entre em contato conosco ou junte-se à nossa comunidade no WhatsApp 
              para receber as melhores oportunidades de trabalho no exterior 
              diretamente no seu celular.
            </p>

            <Button
              size="lg"
              onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
              className="shadow-md hover:shadow-lg hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Entrar na Comunidade WhatsApp
            </Button>
          </div>

          {/* Right Column - Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                onClick={info.action}
                className={`border-2 border-border bg-background p-6 shadow-xs transition-all ${
                  info.action
                    ? "cursor-pointer hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    : ""
                }`}
              >
                <info.icon className="w-6 h-6 mb-3" />
                <div className="text-sm text-muted-foreground mb-1">{info.title}</div>
                <div className="font-bold mb-1">{info.value}</div>
                <div className="text-sm text-muted-foreground">{info.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
