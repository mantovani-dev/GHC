import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/ui/animate-in";

import departure from "@/assets/gallery/departure.jpeg";
import departure9 from "@/assets/gallery/departure9.jpeg";
import departure14 from "@/assets/gallery/departure14.jpeg";
import departure2 from "@/assets/gallery/departure2.jpeg";
import departure3 from "@/assets/gallery/departure3.jpeg";
import departure4 from "@/assets/gallery/departure4.jpeg";
import departure5 from "@/assets/gallery/departure5.jpeg";
import departure6 from "@/assets/gallery/departure6.jpeg";
import departure7 from "@/assets/gallery/departure7.jpeg";
import departure8 from "@/assets/gallery/departure8.jpeg";
import departure10 from "@/assets/gallery/departure10.jpeg";
import departure11 from "@/assets/gallery/departure11.jpeg";
import departure12 from "@/assets/gallery/departure12.jpeg";
import departure13 from "@/assets/gallery/departure13.jpeg";
import departure15 from "@/assets/gallery/departure15.jpeg";
import departure16 from "@/assets/gallery/departure16.jpeg";
import departure17 from "@/assets/gallery/departure17.jpeg";

const photos = [
  departure, departure9, departure14,
  departure2, departure3, departure4, departure5,
  departure6, departure7, departure8, departure10,
  departure11, departure12, departure13, departure15,
  departure16, departure17,
];

const AUTO_PLAY_MS = 4800;

const DepartureGallery = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* As molduras ficam todas montadas para a transição de .6s funcionar na
     troca de classe, mas só carregam a imagem depois de entrar na janela
     prev/cur/next — são 17 fotos, e baixar todas de uma vez custaria caro. */
  const [loaded, setLoaded] = useState<number[]>([]);

  const goTo = useCallback((next: number) => {
    setCurrent((next + photos.length) % photos.length);
  }, []);

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  useEffect(() => {
    const window_ = [current - 1, current, current + 1].map(
      (i) => (i + photos.length) % photos.length
    );
    setLoaded((prevLoaded) => {
      const missing = window_.filter((i) => !prevLoaded.includes(i));
      return missing.length ? [...prevLoaded, ...missing] : prevLoaded;
    });
  }, [current]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [next, isPaused]);

  const prevIndex = (current - 1 + photos.length) % photos.length;
  const nextIndex = (current + 1) % photos.length;

  return (
    <div className="mt-[clamp(72px,8vw,110px)]">
      {/* Cabeçalho */}
      <AnimateIn className="text-center">
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          {t("gallery.tag")}
        </span>

        <h2 className="h2-orbita mx-auto mt-[22px] text-center">
          {t("gallery.title")} <b className="grad">{t("gallery.titleAccent")}</b>
        </h2>

        <p className="lead-orbita mx-auto mt-[22px] max-w-[560px] text-center">
          {t("gallery.description")}
        </p>
      </AnimateIn>

      {/* Carrossel */}
      <AnimateIn>
        <div
          className="gal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
        <button className="arrow" onClick={prev} aria-label="Foto anterior">
          <ChevronLeft className="h-[22px] w-[22px]" />
        </button>

        <div className="frames">
          {photos.map((src, i) => (
            <div
              key={i}
              className={cn(
                "frame",
                i === current && "frame-cur",
                i === prevIndex && "frame-prev",
                i === nextIndex && "frame-next"
              )}
              aria-hidden={i !== current}
            >
              {loaded.includes(i) && <img src={src} alt="Embarque GHC" loading="lazy" />}
              <div className="tagline">
                <span className="mono">GHC Departure</span>
                <span className="mono text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button className="arrow" onClick={next} aria-label="Próxima foto">
          <ChevronRight className="h-[22px] w-[22px]" />
        </button>
        </div>
      </AnimateIn>

      {/* Dots */}
      <div className="dots">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para a foto ${i + 1}`}
            className={cn("dot", i === current && "dot-on")}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="mono mt-3.5 text-center text-foreground/40">
        {current + 1} / {photos.length}
      </div>
    </div>
  );
};

export default DepartureGallery;
