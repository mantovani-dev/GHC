import * as React from "react";
import { cn } from "@/lib/utils";

/* AnchorHTMLAttributes em vez de HTMLAttributes para o `as="a"` aceitar
   href/target/rel sem cast — é o único elemento não-div em uso. */
interface GlassCardProps extends React.AnchorHTMLAttributes<HTMLElement> {
  /** Eleva 5px, acende a borda ciano e ganha glow no hover. */
  hover?: boolean;
  /** Permite renderizar como <a>, <li>, etc. sem perder o visual. */
  as?: React.ElementType;
}

/**
 * Card de vidro do sistema Órbita.
 *
 * O visual vive nas classes `.glass` / `.glass-hov` de index.css — inclusive
 * o bloco `@media (hover:none)`, que troca a elevação por `:active` para o
 * card não ficar "grudado" em hover no celular.
 */
const GlassCard = React.forwardRef<HTMLElement, GlassCardProps>(
  ({ className, hover = false, as, children, ...props }, ref) => {
    const Comp: React.ElementType = as ?? "div";

    return (
      <Comp
        ref={ref}
        className={cn("glass", hover && "glass-hov", className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };
