import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";
  once?: boolean;
  threshold?: number;
  as?: React.ElementType;
}

/**
 * Revelação ao rolar.
 *
 * Progressive enhancement: o conteúdo nasce visível e só é escondido depois
 * que o JS confirma que assumiu o controle (useLayoutEffect, antes do paint,
 * para não piscar). Se o IntersectionObserver não existir — ou nunca entregar
 * callback — a rede de segurança de 1200ms revela tudo. Nenhum conteúdo
 * depende de JS para aparecer.
 */

// Em ambiente sem DOM (build/SSR) useLayoutEffect avisa; cai para useEffect.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const AnimateIn = ({
  children,
  className,
  delay = 0,
  duration = 800,
  animation = "fade-up",
  once = true,
  threshold = 0.12,
  as: as_ = "div",
}: AnimateInProps) => {
  // "idle" = ainda visível, JS não assumiu; "hidden" = aguardando o observer
  const [state, setState] = useState<"idle" | "hidden" | "visible">("idle");
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    setState("hidden");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    let delivered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        delivered = true;
        if (entry.isIntersecting) {
          setState("visible");
          if (once) observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);

    // Rede de segurança: se o observer nunca entregou nada, mostra assim mesmo.
    const safetyNet = window.setTimeout(() => {
      if (!delivered) setState("visible");
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(safetyNet);
    };
  }, [once, threshold]);

  const stateClasses: Record<string, { visible: string; hidden: string }> = {
    "fade-up": {
      visible: "opacity-100 translate-y-0",
      hidden: "opacity-0 translate-y-[26px]",
    },
    "fade-in": {
      visible: "opacity-100",
      hidden: "opacity-0",
    },
    "slide-left": {
      visible: "opacity-100 translate-x-0",
      hidden: "opacity-0 -translate-x-[26px]",
    },
    "slide-right": {
      visible: "opacity-100 translate-x-0",
      hidden: "opacity-0 translate-x-[26px]",
    },
    "scale-in": {
      visible: "opacity-100 scale-100",
      hidden: "opacity-0 scale-95",
    },
  };

  const { visible, hidden } = stateClasses[animation];
  const Tag: React.ElementType = as_;

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-all ease-orbita",
        state === "hidden" ? hidden : visible,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
};

export { AnimateIn };
