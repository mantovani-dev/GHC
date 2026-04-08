import { Quote, MapPin, Briefcase, Instagram, Heart, Share2, Star, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "@/components/ui/animate-in";

interface TestimonialsSectionProps {
  id?: string;
}

const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Anderson Inácio",
      location: t("testimonials.list.case1.location"),
      role: t("testimonials.list.case1.role"),
      quote: t("testimonials.list.case1.quote"),
      initials: "AI",
    },
    {
      name: "Carlos Augusto",
      location: t("testimonials.list.case2.location"),
      role: t("testimonials.list.case2.role"),
      quote: t("testimonials.list.case2.quote"),
      initials: "CA",
    },
    {
      name: "André Mantovani",
      location: t("testimonials.list.case3.location"),
      role: t("testimonials.list.case3.role"),
      quote: t("testimonials.list.case3.quote"),
      initials: "AM",
    },
  ];

  return (
    <section id={id} className="py-12 md:py-20 bg-secondary dot-pattern relative overflow-hidden transition-colors duration-300">

      {/* Decorativos — mais suaves, sem bounce */}
      <div className="absolute top-8 left-8 md:left-16 text-accent opacity-10 animate-float pointer-events-none">
        <Star className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <div className="absolute bottom-8 right-8 md:right-24 text-foreground opacity-6 animate-float pointer-events-none" style={{ animationDelay: "3s" }}>
        <Heart className="w-16 h-16 md:w-24 md:h-24" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* Coluna de texto */}
          <AnimateIn animation="slide-left" className="max-w-2xl text-center lg:text-left flex-1 w-full">
            <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 mb-5 bg-background shadow-xs rounded-sm font-bold uppercase text-xs tracking-widest">
              <Instagram className="w-3.5 h-3.5 text-accent" />
              <span>GHC NAS REDES SOCIAIS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 tracking-tight leading-[1.1]">
              Veja o que estão <br />
              <span className="text-accent inline-block transform -rotate-1 relative">
                falando de nós
                <span className="absolute -bottom-1.5 left-0 w-full h-1.5 bg-foreground/15 dark:bg-foreground/40 rounded-sm skew-x-6" />
              </span>{" "}
              <br />
              na internet!
            </h2>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium mb-7">
              Diariamente, milhares de profissionais acompanham o trabalho da GHC.
              Dê o play e confira a experiência real de quem já iniciou sua jornada na Europa.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-foreground/60 font-semibold">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-current text-red-500" />
                <span className="text-sm">Curta</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Compartilhe</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 mt-7 text-foreground/70 font-bold uppercase tracking-widest text-xs">
              <span>Assista ao depoimento</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </AnimateIn>

          {/* Card do vídeo */}
          <AnimateIn animation="slide-right" delay={150} className="w-full max-w-[420px] relative group lg:shrink-0">
            {/* Sombra decorativa de fundo */}
            <div className="absolute -inset-2 border border-border bg-accent/15 transform rotate-2 translate-x-1.5 translate-y-1.5 transition-transform duration-500 rounded-sm group-hover:rotate-3 group-hover:bg-accent/25 pointer-events-none" />

            {/* Card principal */}
            <div className="relative border-2 border-border bg-background rounded-sm shadow-[5px_5px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[5px_5px_0px_0px_rgba(51,186,233,0.35)] flex flex-col overflow-hidden z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">

              {/* Cabeçalho do card */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/70">
                <div className="flex items-center gap-3">
                  <div className="bg-background p-1.5 border border-border rounded-sm">
                    <Instagram className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight uppercase tracking-wide">Case em Vídeo</h3>
                    <p className="text-[10px] font-bold text-muted-foreground tracking-widest">REELS</p>
                  </div>
                </div>
              </div>

              {/* iframe do Instagram */}
              <div className="w-full bg-background relative min-h-[600px] sm:min-h-[660px] md:min-h-[700px]">
                <iframe
                  src="https://www.instagram.com/reel/DU1NtmCkSVp/embed"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                  title="Depoimento Instagram GHC"
                />
              </div>
            </div>
          </AnimateIn>

        </div>

        {/* ================================================================
        TODO: DESCOMENTAR QUANDO CHEGAREM NOVOS CASES
        ================================================================
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {testimonials.map((testimonial, index) => (
            <AnimateIn key={index} animation="fade-up" delay={index * 80}>
              <div className="border border-border bg-background p-6 shadow-xs rounded-sm hover:shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 flex flex-col h-full">
                <Quote className="w-7 h-7 mb-4 text-accent opacity-50 shrink-0" />
                <p className="text-foreground mb-5 flex-grow leading-relaxed italic text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                  <div className="w-10 h-10 border border-border rounded-sm flex items-center justify-center font-bold bg-secondary shrink-0 shadow-xs text-sm">
                    {testimonial.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate">{testimonial.name}</div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {testimonial.role}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
        */}

      </div>
    </section>
  );
};

export default TestimonialsSection;
