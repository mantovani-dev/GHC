import { Quote, MapPin, Briefcase, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";

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
    {
      name: "Letícia Cacique",
      location: t("testimonials.list.case4.location"),
      role: t("testimonials.list.case4.role"),
      quote: t("testimonials.list.case4.quote"),
      initials: "LC",
    },
    {
      name: "Gabriel Borges",
      location: t("testimonials.list.case5.location"),
      role: t("testimonials.list.case5.role"),
      quote: t("testimonials.list.case5.quote"),
      initials: "GB",
    },
    {
      name: "Filomena da Silva",
      location: t("testimonials.list.case6.location"),
      role: t("testimonials.list.case6.role"),
      quote: t("testimonials.list.case6.quote"),
      initials: "FS",
    },
  ];

  return (
    <section id={id} className="py-20 md:py-32 bg-secondary transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 border-2 border-border px-4 py-2 mb-6 bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] font-bold uppercase text-xs tracking-widest">
            <span>{t("testimonials.tag")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            {t("testimonials.title")}
            <br />
            <span className="border-b-4 border-foreground">{t("testimonials.titleAccent")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("testimonials.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          
          <div className="border-2 border-border bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[7px_7px_0px_0px_rgba(255,255,255,1)] transition-all flex flex-col h-full lg:row-span-2 overflow-hidden">
            
            <div className="flex items-center gap-3 p-4 md:p-6 border-b-2 border-border bg-secondary/30">
              <div className="bg-primary/10 p-2 rounded-full border-2 border-border">
                <Instagram className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Case em Vídeo</h3>
                <p className="text-xs text-muted-foreground">Assista ao relato completo</p>
              </div>
            </div>

            <div className="w-full flex-grow bg-background relative min-h-[660px] md:min-h-[700px]">
              <iframe
                src="https://www.instagram.com/reel/DU1NtmCkSVp/embed"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
                title="Depoimento Instagram"
              ></iframe>
            </div>
          </div>

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
      </div>
    </section>
  );
};

export default TestimonialsSection;