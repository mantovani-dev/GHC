import { Instagram, Heart, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import DepartureGallery from "./DepartureGallery";

interface TestimonialsSectionProps {
  id?: string;
}

const INSTAGRAM = "https://www.instagram.com/agencia_ghc/";

const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const { t } = useTranslation();

  return (
    <section id={id} className="wrap sec pt-0">
      <div className="social">
        {/* Coluna de texto */}
        <AnimateIn>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {t("socialProof.span")}
          </span>

          <h2 className="h2-orbita mt-[22px]">
            {t("socialProof.title1")} <b className="grad">{t("socialProof.titleSpan")}</b>{" "}
            {t("socialProof.title2")}
          </h2>

          <p className="lead-orbita mt-[26px] max-w-[560px]">
            {t("socialProof.description")}
          </p>

          <div className="mt-[30px] flex gap-[22px] text-[13.5px] font-semibold text-foreground/55">
            <span className="inline-flex items-center gap-2">
              <Heart className="h-[18px] w-[18px] text-[#ef4444]" />
              {t("socialProof.like")}
            </span>
            <span className="inline-flex items-center gap-2">
              <Share2 className="h-[18px] w-[18px]" />
              {t("socialProof.share")}
            </span>
          </div>

          <Button
            variant="orbitaGhost"
            size="orbita"
            className="mt-[30px] [&_svg]:size-4"
            onClick={() => window.open(INSTAGRAM, "_blank", "noopener,noreferrer")}
          >
            <Instagram />
            @agencia_ghc
          </Button>
        </AnimateIn>

        {/* Reel do Instagram na moldura de vidro */}
        <AnimateIn animation="slide-right" delay={70}>
          <div className="reel">
            <iframe
              src="https://www.instagram.com/reel/DaS5BLxxB7G/embed"
              className="block w-full min-h-[600px] sm:min-h-[660px] md:min-h-[700px]"
              frameBorder="0"
              scrolling="no"
              allow="encrypted-media"
              title={t("socialProof.video")}
              loading="lazy"
            />
          </div>
        </AnimateIn>
      </div>

      {/* Galeria de Embarques */}
      <DepartureGallery />
    </section>
  );
};

export default TestimonialsSection;
