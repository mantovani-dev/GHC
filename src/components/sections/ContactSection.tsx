import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "@/components/ui/animate-in";
import { useCommunityLink } from "@/hooks/useCommunityLink";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id }: ContactSectionProps) => {
  const { t } = useTranslation();
  const communityLink = useCommunityLink();

  const contactInfo = [
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
    <section id={id} className="py-16 md:py-28 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Coluna Esquerda */}
          <AnimateIn animation="slide-left">
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 mb-5 bg-secondary shadow-xs rounded-sm">
              <span className="text-xs font-bold uppercase tracking-widest">{t("contact.tag")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-5 tracking-tight leading-tight">
              {t("contact.title")}
              <br />
              <span className="border-b-[3px] border-foreground">{t("contact.titleAccent")}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {t("contact.description")}
            </p>

            <Button
              size="lg"
              onClick={() => window.open(communityLink, "_blank")}
              className="font-bold border border-border rounded-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[3px_3px_0px_0px_rgba(51,186,233,0.35)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.9)] dark:hover:shadow-[5px_5px_0px_0px_rgba(51,186,233,0.5)] transition-all duration-200 h-auto py-3.5 px-8 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {t("contact.cta")}
            </Button>
          </AnimateIn>

          {/* Coluna Direita — Cards */}
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 content-start">
            {contactInfo.map((info, index) => (
              <AnimateIn key={index} animation="fade-up" delay={index * 80}>
                <div
                  onClick={info.action}
                  className={cn(
                    "border border-border bg-background p-5 shadow-xs rounded-sm transition-all duration-200 flex flex-col h-full group",
                    info.action
                      ? "cursor-pointer hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px]"
                      : ""
                  )}
                >
                  <div className="w-9 h-9 rounded-sm bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors duration-200 shrink-0">
                    <info.icon className="w-4 h-4 text-primary" />
                  </div>

                  <div className="text-[10px] text-muted-foreground mb-1 font-bold uppercase tracking-wider">
                    {info.title}
                  </div>

                  <div
                    className={cn(
                      "font-bold mb-1.5 leading-tight",
                      info.title === t("contact.email")
                        ? "break-all text-xs sm:text-sm"
                        : "text-sm md:text-base"
                    )}
                  >
                    {info.value}
                  </div>

                  <div className="text-xs text-muted-foreground mt-auto leading-snug">
                    {info.description}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
