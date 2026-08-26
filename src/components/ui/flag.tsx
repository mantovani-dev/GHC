import { cn } from "@/lib/utils";
import type { CountryCode } from "@/data/vacancies";

/**
 * Bandeiras em SVG, desenhadas à mão.
 *
 * Não usamos os emojis 🇵🇱🇭🇷🇲🇪🇩🇰 porque o Windows não tem fonte de
 * bandeiras — lá eles aparecem como as duas letras do código do país.
 *
 * Polônia e Dinamarca são fiéis. Croácia leva o tricolor com o xadrez
 * simplificado (4×4 em vez de 5×5, sem a coroa de brasões). Montenegro leva
 * o campo vermelho com a borda dourada, sem a águia bicéfala — nesse
 * tamanho ela viraria um borrão.
 */

/* viewBox 24×16 (3:2) */
const shapes: Record<CountryCode, JSX.Element> = {
  pl: (
    <>
      <rect width="24" height="8" fill="#ffffff" />
      <rect y="8" width="24" height="8" fill="#dc143c" />
    </>
  ),

  dk: (
    <>
      <rect width="24" height="16" fill="#c8102e" />
      <rect x="6.5" width="3" height="16" fill="#ffffff" />
      <rect y="6.5" width="24" height="3" fill="#ffffff" />
    </>
  ),

  hr: (
    <>
      <rect width="24" height="5.34" fill="#ff0000" />
      <rect y="5.34" width="24" height="5.33" fill="#ffffff" />
      <rect y="10.67" width="24" height="5.33" fill="#171796" />
      {/* Xadrez do brasão, 4×4 começando por vermelho */}
      {Array.from({ length: 16 }, (_, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        if ((col + row) % 2 !== 0) return null;
        return (
          <rect
            key={i}
            x={9 + col * 1.5}
            y={5 + row * 1.5}
            width="1.5"
            height="1.5"
            fill="#ff0000"
          />
        );
      })}
      <rect
        x="9"
        y="5"
        width="6"
        height="6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="0.5"
      />
    </>
  ),

  me: (
    <>
      <rect width="24" height="16" fill="#c40308" />
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="14.5"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.5"
      />
    </>
  ),
};

interface FlagProps {
  code: CountryCode;
  /** Classes de tamanho; o padrão é 21×14. */
  className?: string;
}

export const Flag = ({ code, className }: FlagProps) => (
  <span
    className={cn(
      "inline-block h-[14px] w-[21px] shrink-0 overflow-hidden rounded-[3px] ring-1 ring-inset ring-white/25",
      className
    )}
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 16" className="block h-full w-full" focusable="false">
      {shapes[code]}
    </svg>
  </span>
);
