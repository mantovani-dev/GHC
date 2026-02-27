import { Quote, MapPin, Briefcase, Instagram, Heart, Share2, Star, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TestimonialsSectionProps {
  id?: string;
}

const TestimonialsSection = ({ id }: TestimonialsSectionProps) => {
  const { t } = useTranslation();

  // Array mantido aqui para uso futuro. A renderização lá embaixo está comentada.
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
    <section id={id} className="py-12 md:py-16 bg-secondary relative overflow-hidden transition-colors duration-300">
      
      <div className="absolute top-10 left-10 md:left-20 text-primary opacity-20 animate-[pulse_4s_ease-in-out_infinite]">
        <Star className="w-16 h-16 md:w-24 md:h-24" />
      </div>
      <div className="absolute bottom-10 right-10 md:right-32 text-foreground opacity-10 animate-[bounce_6s_ease-in-out_infinite]">
        <Heart className="w-20 h-20 md:w-32 md:h-32" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          <div className="max-w-2xl text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] font-bold uppercase text-xs tracking-widest">
              <Instagram className="w-4 h-4 text-primary" />
              <span>GHC NAS REDES SOCIAIS</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
              Veja o que estão <br />
              <span className="text-primary inline-block transform -rotate-1 relative">
                falando de nós
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-foreground/20 dark:bg-foreground/50 skew-x-12"></span>
              </span> <br />
              na internet!
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium mb-8">
              Diariamente, milhares de profissionais acompanham o trabalho da GHC. 
              Dê o play e confira a experiência real de quem já iniciou sua jornada na Europa.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-foreground/70 font-bold">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 fill-current text-red-500" />
                <span className="text-lg">Curta</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-6 h-6" />
                <span className="text-lg">Compartilhe</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 mt-8 text-foreground font-black uppercase tracking-widest text-sm animate-bounce">
              <span>Assista ao depoimento</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          <div className="w-full max-w-[450px] relative group lg:shrink-0 perspective-1000">
            <div className="absolute -inset-2 md:-inset-4 border-2 border-border bg-primary/20 transform rotate-3 translate-x-2 translate-y-2 transition-transform duration-500 group-hover:rotate-6 group-hover:bg-primary/30"></div>

            <div className="relative border-4 border-border bg-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] flex flex-col overflow-hidden z-10 transition-transform duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2">
              
              <div className="flex items-center justify-between p-4 md:p-5 border-b-4 border-border bg-secondary/80">
                <div className="flex items-center gap-3">
                  <div className="bg-background p-2 border-2 border-border">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight uppercase">Case em Vídeo</h3>
                    <p className="text-xs font-bold text-muted-foreground tracking-widest">REELS</p>
                  </div>
                </div>
              </div>

              <div className="w-full bg-background relative min-h-[660px] md:min-h-[720px]">
                <iframe
                  src="https://www.instagram.com/reel/DU1NtmCkSVp/embed"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                  title="Depoimento Instagram GHC"
                ></iframe>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================
        TODO: DESCOMENTAR QUANDO CHEGAREM NOVOS CASES
        Abaixo estão os cards originais em texto prontos para serem usados.
        Quando for utilizar, lembre-se de mudar o layout acima de volta para 
        uma estrutura normal (ex: text-center) e remover o layout dividido.
        ========================================================================
        */}
        
        {/*
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border-2 border-border bg-background p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[7px_7px_0px_0px_rgba(255,255,255,1)] transition-all flex flex-col h-full"
            >
              <Quote className="w-8 h-8 mb-4 text-primary opacity-50 shrink-0" />
              <p className="text-foreground mb-6 flex-grow leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t-2 border-border mt-auto">
                <div className="w-12 h-12 border-2 border-border flex items-center justify-center font-bold bg-secondary shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                  {testimonial.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-bold truncate">{testimonial.name}</div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
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
          ))}
        </div>
        */}
        
      </div>
    </section>
  );
};

export default TestimonialsSection;