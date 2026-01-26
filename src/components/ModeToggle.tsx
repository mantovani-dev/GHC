import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-9 w-16 items-center rounded-full border-2 border-border transition-colors duration-300 focus-visible:outline-none",
        "bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
        "hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none"
      )}
      aria-label="Alternar tema"
    >
      {/* Círculo deslizante (Knob) */}
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full bg-primary border-2 border-border transition-all duration-300 shadow-sm",
          "translate-x-1 dark:translate-x-8"
        )}
      >
        {/* Ícone Sol (visível no modo claro) */}
        <Sun className="h-3.5 w-3.5 text-primary-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        
        {/* Ícone Lua (visível no modo escuro) */}
        <Moon className="absolute h-3.5 w-3.5 text-primary-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>

      {/* Ícones de fundo estáticos para profundidade visual */}
      <div className="absolute right-2.5 opacity-20 dark:opacity-0 transition-opacity">
        <Moon className="h-3 w-3 text-foreground" />
      </div>
      <div className="absolute left-2.5 opacity-0 dark:opacity-20 transition-opacity">
        <Sun className="h-3 w-3 text-foreground" />
      </div>
    </button>
  );
}