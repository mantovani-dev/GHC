import { useTranslation } from "react-i18next";

const COMMUNITY_LINKS: Record<string, string> = {
  pt: "https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D",
  en: "https://whatsapp.com/channel/0029VbC3MhMChq6KFXJox70D",
  es: "https://whatsapp.com/channel/0029Vb8Pf7L4SpkGSGcYdE1E",
};

const DEFAULT_LINK = COMMUNITY_LINKS.pt;

export function useCommunityLink(): string {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0];
  return COMMUNITY_LINKS[lang] ?? DEFAULT_LINK;
}
