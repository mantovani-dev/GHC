import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const languages = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const current = i18n.language?.split("-")[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* Mesmo desenho do .menu-btn do protótipo, num diâmetro menor */}
        <button
          className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full border border-white/[0.13] bg-white/[0.04] text-foreground transition-all duration-200 hover:border-accent/60 hover:text-accent active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Trocar idioma"
        >
          <Languages className="h-[17px] w-[17px]" />
        </button>
      </DropdownMenuTrigger>

      {/* Valores do `.pane` do protótipo — `.glass` não serve aqui porque
          `bg-popover` da base do shadcn vence a camada de components */}
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="min-w-[172px] rounded-pane border-white/[0.085] bg-[var(--pane-bg)] p-1.5 shadow-pane backdrop-blur-[22px]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={cn(
              "flex cursor-pointer gap-2.5 rounded-xl px-3 py-2 text-[13.5px] transition-colors focus:bg-accent/10 focus:text-foreground",
              current === lang.code
                ? "bg-accent/10 font-semibold text-accent"
                : "font-medium text-foreground/70"
            )}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
