import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id }: ContactSectionProps) => {
  const { t } = useTranslation();

  const contactInfo = [
    // {
    //   icon: MessageCircle,
    //   title: t("contact.whatsapp"),
    //   value: "+55 11 94003-3692",
    //   description: t("contact.response"),
    //   action: () => window.open("https://wa.me/5511940033692", "_blank"),
    // },
    {
      icon: Mail,
      title: t("contact.email"),
      value: "atendimento@globalhiringcareers.com",
      description: t("contact.partnerships"),
      action: () => window.open("mailto:atendimento@globalhiringcareers.com", "_blank"),
    },
    {
      icon: Clock,
      title: t("contact.hours"),
      value: t("contact.week"),
      description: t("contact.schedule"),
    },
    {
      icon: MapPin,
      title: t("contact.location"),
      value: t("contact.city"),
      description: t("contact.scope"),
    },
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Coluna Esquerda - Texto Traduzido */}
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-secondary shadow-xs">
              <span className="text-sm font-bold uppercase tracking-widest">{t("contact.tag")}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              {t("contact.title")}
              <br />
              <span className="border-b-4 border-foreground">{t("contact.titleAccent")}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t("contact.description")}
            </p>

            <Button
              size="lg"
              onClick={() => window.open("https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D", "_blank")}
              className="font-bold border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all h-auto py-4 px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t("contact.cta")}
            </Button>
          </div>

          {/* Coluna Direita - Cards de Contato Dinâmicos */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                onClick={info.action}
                className={cn(
                  "border-2 border-border bg-background p-6 shadow-xs transition-all flex flex-col h-full",
                  info.action ? "cursor-pointer hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px]" : ""
                )}
              >
                <info.icon className="w-6 h-6 mb-3 shrink-0 text-primary" />
                <div className="text-xs text-muted-foreground mb-1 font-bold uppercase tracking-wider">{info.title}</div>
                
                <div className={cn(
                  "font-bold mb-1 leading-tight",
                  info.title === t("contact.email") ? "break-all text-sm sm:text-base" : "text-base"
                )}>
                  {info.value}
                </div>
                
                <div className="text-sm text-muted-foreground mt-auto">{info.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;