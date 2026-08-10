import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "@/components/ui/animate-in";
import { GlassCard } from "@/components/ui/glass-card";
import { useCommunityLink } from "@/hooks/useCommunityLink";

interface ContactSectionProps {
  id?: string;
}

const EMAIL = "atendimento@globalhiringcareers.com";

const ContactSection = ({ id }: ContactSectionProps) => {
  const { t } = useTranslation();
  const communityLink = useCommunityLink();

  return (
    <section id={id} className="wrap sec pt-0">
      <div className="contact">
        {/* Coluna esquerda */}
        <AnimateIn animation="slide-left">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {t("contact.tag")}
          </span>

          <h2 className="h2-orbita mt-[22px]">
            {t("contact.title")} <b className="grad">{t("contact.titleAccent")}</b>
          </h2>

          <p className="lead-orbita mt-[26px] max-w-[560px]">{t("contact.description")}</p>

          <Button
            variant="orbita"
            size="orbitaLg"
            className="mt-[34px] max-[600px]:w-full max-[600px]:justify-center"
            onClick={() => window.open(communityLink, "_blank", "noopener,noreferrer")}
          >
            <MessageCircle />
            {t("contact.cta")}
          </Button>
        </AnimateIn>

        {/* Coluna direita — cards de vidro */}
        <AnimateIn className="cgrid">
          <GlassCard as="a" hover href={`mailto:${EMAIL}`} className="col-span-2">
            <div className="ico ico-sm">
              <Mail className="h-[17px] w-[17px]" />
            </div>
            <div className="c-k">{t("contact.email")}</div>
            <div className="c-v">{EMAIL}</div>
            <div className="c-s">{t("contact.partnerships")}</div>
          </GlassCard>

          <GlassCard hover>
            <div className="ico ico-sm">
              <Clock className="h-[17px] w-[17px]" />
            </div>
            <div className="c-k">{t("contact.hours")}</div>
            <div className="c-v">{t("contact.week")}</div>
            <div className="c-s">{t("contact.schedule")}</div>
          </GlassCard>

          <GlassCard hover>
            <div className="ico ico-sm">
              <MapPin className="h-[17px] w-[17px]" />
            </div>
            <div className="c-k">{t("contact.location")}</div>
            <div className="c-v">{t("contact.city")}</div>
            <div className="c-s">{t("contact.scope")}</div>
          </GlassCard>
        </AnimateIn>
      </div>
    </section>
  );
};

export default ContactSection;
