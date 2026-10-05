import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Plane,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCommunityLink } from "@/hooks/useCommunityLink";
import { AnimateIn } from "@/components/ui/animate-in";
import { GlassCard } from "@/components/ui/glass-card";
import { CountUp } from "@/components/ui/count-up";
import { vacancies } from "@/data/vacancies";

import imgStack from "@/assets/gallery/departure9.webp";
import face1 from "@/assets/gallery/departure.avatar.webp";
import face2 from "@/assets/gallery/departure2.avatar.webp";
import face3 from "@/assets/gallery/departure5.avatar.webp";
import face4 from "@/assets/gallery/departure11.avatar.webp";

const faces = [face1, face2, face3, face4];

interface HeroSectionProps {
  id?: string;
}

const HeroSection = ({ id }: HeroSectionProps) => {
  const { t } = useTranslation();
  const communityLink = useCommunityLink();
  const embarked = Number(t("milestone.count"));

  const pillars = [
    {
      icon: ShieldCheck,
      label: t("hero.pillars.security.label"),
      sub: t("hero.pillars.security.sub"),
    },
    {
      icon: MapPin,
      label: t("hero.pillars.support.label"),
      sub: t("hero.pillars.support.sub"),
    },
    {
      icon: CheckCircle2,
      label: t("hero.pillars.verified.label"),
      sub: t("hero.pillars.verified.sub"),
    },
  ];

  return (
    <>
      <section id={id} className="wrap">
        <div className="hero">
          {/* Coluna de texto */}
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              {t("hero.tag")}
            </span>

            <h1 className="h1-orbita mt-[26px]">
              {t("hero.title")}
              <br />
              <b className="grad">{t("hero.titleAccent")}</b>
            </h1>

            <p className="lead-orbita mt-[26px] max-w-[560px]">{t("hero.description")}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                variant="orbita"
                size="orbitaLg"
                className="max-[600px]:w-full max-[600px]:justify-center"
              >
                <Link to="/vagas">
                  {t("vacancies.heroCta")}
                  <span className="rounded-pill bg-accent-foreground/20 px-2 py-0.5 text-[12px] font-semibold">
                    {vacancies.length}
                  </span>
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                variant="orbitaGhost"
                size="orbitaLg"
                className="max-[600px]:w-full max-[600px]:justify-center"
                onClick={() => window.open(communityLink, "_blank", "noopener,noreferrer")}
              >
                <MessageCircle />
                {t("hero.cta")}
              </Button>
            </div>
          </div>

          {/* Stack de vidro: foto + card do marco */}
          <div className="stack">
            <div className="pane p-img">
              <img
                src={imgStack}
                alt="Embarque GHC"
                width={720}
                height={1280}
                decoding="async"
                /* Em minúsculas de propósito: o React 18 não conhece
                   `fetchPriority` em camelCase — ele avisa no console e
                   descarta o atributo, que era justamente o contrário do
                   pretendido. Assim ele chega ao HTML. */
                {...{ fetchpriority: "high" }}
              />
            </div>

            <div className="pane card-fx">
              <div className="row">
                <span className="mono text-foreground/50">{t("heroStat.label")}</span>
                <Plane className="h-[19px] w-[19px] text-accent" />
              </div>

              <div className="row items-end">
                <CountUp to={embarked} prefix="+" className="stat-n" />
                <div className="faces">
                  {faces.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      aria-hidden="true"
                      width={128}
                      height={128}
                      decoding="async"
                    />
                  ))}
                </div>
              </div>

              <div className="row">
                <span className="text-[13.5px] leading-[1.5] text-foreground/50">
                  {t("heroStat.text")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares — no protótipo é a faixa .tri logo abaixo do hero */}
      <AnimateIn as="section" className="wrap">
        <div className="tri">
          {pillars.map((pillar, i) => (
            <GlassCard key={i} hover>
              <div className="ico">
                <pillar.icon className="h-[19px] w-[19px]" />
              </div>
              <h3>{pillar.label}</h3>
              <p>{pillar.sub}</p>
            </GlassCard>
          ))}
        </div>
      </AnimateIn>
    </>
  );
};

export default HeroSection;
