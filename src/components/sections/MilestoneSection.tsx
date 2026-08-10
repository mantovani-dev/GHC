import { Briefcase, FileCheck, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "@/components/ui/animate-in";
import { CountUp } from "@/components/ui/count-up";

const MilestoneSection = () => {
  const { t } = useTranslation();
  const count = Number(t("milestone.count"));

  const items = [
    { icon: Briefcase, key: "contracts" },
    { icon: FileCheck, key: "documents" },
    { icon: Users, key: "network" },
  ];

  return (
    <AnimateIn as="section" className="wrap pb-[clamp(72px,8vw,120px)]">
      <div className="mile">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            {t("milestone.tag")}
          </span>

          <CountUp to={count} prefix="+" className="huge mt-[22px] block" />

          <p className="mt-[18px] max-w-[420px] text-[17px] leading-[1.65] text-foreground/60">
            {t("milestone.headline")}
          </p>
        </div>

        <div className="mile-r">
          {items.map((item) => (
            <div key={item.key} className="mtile">
              <div className="ico ico-sm">
                <item.icon className="h-[17px] w-[17px]" />
              </div>
              <div>
                <div className="mtile-k">{t(`milestone.items.${item.key}.title`)}</div>
                <div className="mtile-s">{t(`milestone.items.${item.key}.text`)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
};

export default MilestoneSection;
