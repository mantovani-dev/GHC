import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in";
  once?: boolean;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

const AnimateIn = ({
  children,
  className,
  delay = 0,
  duration = 600,
  animation = "fade-up",
  once = true,
  threshold = 0.1,
  as: Tag = "div",
}: AnimateInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, threshold]);

  const stateClasses: Record<string, { visible: string; hidden: string }> = {
    "fade-up": {
      visible: "opacity-100 translate-y-0",
      hidden:  "opacity-0 translate-y-6",
    },
    "fade-in": {
      visible: "opacity-100",
      hidden:  "opacity-0",
    },
    "slide-left": {
      visible: "opacity-100 translate-x-0",
      hidden:  "opacity-0 -translate-x-6",
    },
    "slide-right": {
      visible: "opacity-100 translate-x-0",
      hidden:  "opacity-0 translate-x-6",
    },
    "scale-in": {
      visible: "opacity-100 scale-100",
      hidden:  "opacity-0 scale-95",
    },
  };

  const { visible, hidden } = stateClasses[animation];

  return (
    // @ts-ignore — Tag as polymorphic element
    <Tag
      ref={ref}
      className={cn("transition-all ease-out", isVisible ? visible : hidden, className)}
      style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export { AnimateIn };
