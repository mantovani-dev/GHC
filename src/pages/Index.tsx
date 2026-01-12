import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Global Hiring & Careers (GHC) | Recrutamento Internacional para Brasileiros</title>
        <meta
          name="description"
          content="Conectamos profissionais brasileiros às melhores oportunidades de trabalho no exterior. Junte-se à nossa comunidade e dê o próximo passo na sua carreira global."
        />
        <meta
          name="keywords"
          content="trabalho no exterior, vagas internacionais, recrutamento internacional, emprego exterior, carreira internacional, brasileiros no exterior, GHC"
        />
        <link rel="canonical" href="https://ghc.com.br" />
        <meta property="og:title" content="GHC | Recrutamento Internacional" />
        <meta
          property="og:description"
          content="Conectamos profissionais brasileiros às melhores oportunidades de trabalho no exterior."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ghc.com.br" />
      </Helmet>

      <Header />
      <main>
        <HeroSection id="inicio" />
        <AboutSection id="sobre" />
        <HowItWorksSection id="como-funciona" />
        <TestimonialsSection id="cases" />
        <ContactSection id="contato" />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export default Index;
