import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plane, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";
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

const AUTO_PLAY_MS = 4500;

const DepartureGallery = () => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(next);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const prev = useCallback(
    () => goTo((current - 1 + photos.length) % photos.length),
    [current, goTo]
  );
  const next = useCallback(
    () => goTo((current + 1) % photos.length),
    [current, goTo]
  );

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(id);
  }, [next, isPaused]);

  const prevIndex = (current - 1 + photos.length) % photos.length;
  const nextIndex = (current + 1) % photos.length;

  return (
    <div className="mt-16 md:mt-24">
      {/* Header */}
      <AnimateIn animation="fade-up" className="text-center mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 mb-5 bg-background shadow-xs rounded-sm font-bold uppercase text-xs tracking-widest">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>{t("gallery.tag")}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-4">
          {t("gallery.title")}{" "}
          <span className="text-accent inline-block transform -rotate-1 relative">
            {t("gallery.titleAccent")}
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-foreground/15 dark:bg-foreground/40 rounded-sm skew-x-6" />
          </span>
        </h3>

        <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto font-medium">
          {t("gallery.description")}
        </p>
      </AnimateIn>

      {/* Carousel */}
      <AnimateIn animation="scale-in" delay={100}>
        <div
          className="relative flex items-center justify-center gap-2 sm:gap-4 md:gap-8 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="z-20 shrink-0 w-10 h-10 md:w-12 md:h-12 border-2 border-border bg-background rounded-sm shadow-xs flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Cards area */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] aspect-[3/4] mx-auto">
            {/* Background card (prev) */}
            <div className="absolute inset-0 z-0 transition-all duration-500 -translate-x-4 md:-translate-x-8 scale-[0.88] opacity-40 blur-[1px] pointer-events-none">
              <PolaroidCard src={photos[prevIndex]} />
            </div>

            {/* Background card (next) */}
            <div className="absolute inset-0 z-0 transition-all duration-500 translate-x-4 md:translate-x-8 scale-[0.88] opacity-40 blur-[1px] pointer-events-none">
              <PolaroidCard src={photos[nextIndex]} />
            </div>

            {/* Main card */}
            <div
              key={current}
              className="absolute inset-0 z-10 animate-polaroid-in"
            >
              <PolaroidCard src={photos[current]} active />
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Next photo"
            className="z-20 shrink-0 w-10 h-10 md:w-12 md:h-12 border-2 border-border bg-background rounded-sm shadow-xs flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6 md:mt-8">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-accent"
                  : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs font-bold text-muted-foreground tracking-widest uppercase">
          <Plane className="w-3.5 h-3.5 text-accent" />
          <span>
            {current + 1} / {photos.length}
          </span>
        </div>
      </AnimateIn>
    </div>
  );
};

function PolaroidCard({ src, active }: { src: string; active?: boolean }) {
  return (
    <div
      className={`
        w-full h-full bg-background border-2 border-border rounded-sm
        flex flex-col overflow-hidden
        ${active
          ? "shadow-[5px_5px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[5px_5px_0px_0px_rgba(51,186,233,0.35)]"
          : "shadow-xs"
        }
      `}
    >
      {/* Photo area */}
      <div className="relative flex-1 m-2.5 sm:m-3 md:m-4 border border-border overflow-hidden bg-secondary">
        <img
          src={src}
          alt="GHC departures"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Bottom strip — polaroid style */}
      <div className="px-3 md:px-4 pb-3 md:pb-4 pt-1 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Plane className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent" />
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-muted-foreground">
            GHC Departure
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground/60 font-mono">
          ✈
        </span>
      </div>
    </div>
  );
}

export default DepartureGallery;
