import { createContext, useContext, useEffect } from "react";

/**
 * A identidade "Órbita" é só escura — não existe versão clara desenhada.
 * O provider mantém a mesma API para não quebrar quem o consome, mas
 * aplica sempre `dark` no <html>.
 */
type Theme = "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultTheme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  storageKey,
  ...props
}: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
  }, []);

  return (
    <ThemeProviderContext.Provider {...props} value={initialState}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
