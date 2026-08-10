import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface CountUpProps {
  /** Valor final do contador. */
  to: number;
  /** Prefixo colado no número, ex.: "+". */
  prefix?: string;
  duration?: number;
  className?: string;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Contador animado: dispara a 50% de visibilidade e anima por 1400ms com
 * ease-out cúbico — 1 - (1 - p)³, exatamente como o protótipo.
 *
 * Mesma lógica de progressive enhancement do AnimateIn: o número nasce no
 * valor final e só volta a zero depois que o JS confirma que assumiu. Se o
 * observer não existir ou nunca entregar callback, o valor final fica.
 */
const CountUp = ({ to, prefix = "", duration = 1400, className }: CountUpProps) => {
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    setValue(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    let delivered = false;
    let frame = 0;

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        delivered = true;
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          animate();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    const safetyNet = window.setTimeout(() => {
      if (!delivered) setValue(to);
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(safetyNet);
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
    </span>
  );
};

export { CountUp };
