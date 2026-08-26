import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Seo from "@/components/Seo";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import VacanciesTeaser from "@/components/sections/VacanciesTeaser";
import AboutSection from "@/components/sections/AboutSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import MilestoneSection from "@/components/sections/MilestoneSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import AmbientBackground from "@/components/layout/AmbientBackground";

const Index = () => {
  const { hash } = useLocation();

  /* Chegou de outra rota com /#secao — rola até lá depois de montar */
  useEffect(() => {
    if (!hash) return;
    /* O efeito roda depois do commit, então o bloco já existe no DOM.
       Sem requestAnimationFrame de propósito: ele não dispara em aba
       oculta, e a rolagem ficaria pendurada. */
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <>
      <Seo />

      {/* `relative` ancora as auréolas do fundo na altura do documento;
          `orbita` liga o strokeWidth 1.5 dos ícones Lucide */}
      <div className="orbita relative">
        <AmbientBackground />

        <Header />
        <main className="relative z-[1]">
          <HeroSection id="inicio" />
          <VacanciesTeaser />
          <AboutSection id="sobre" />
          <HowItWorksSection id="como-funciona" />
          <MilestoneSection />
          <TestimonialsSection id="cases" />
          <ContactSection id="contato" />
        </main>
        <Footer />
      </div>

      <WhatsAppFloat />
    </>
  );
};

export default Index;
