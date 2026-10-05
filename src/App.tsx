import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ServiceWorkerUpdate from "@/components/ServiceWorkerUpdate";

/*
 * Cada rota é um pedaço separado do build.
 *
 * Antes era tudo um arquivo só: quem abria /vagas baixava junto a home
 * inteira — herói, galeria de embarques e o incorporado do Instagram —
 * sem usar nada disso. Com o import dinâmico, a página pega o que é dela.
 */
const Index = lazy(() => import("./pages/Index"));
const Vacancies = lazy(() => import("./pages/Vacancies"));
const GhcBio = lazy(() => import("./pages/GhcBio"));
const NotFound = lazy(() => import("./pages/NotFound"));

/*
 * Aqui existiam <Toaster />, <Sonner /> e <TooltipProvider />, herdados do
 * andaime inicial do projeto. Nenhuma tela do site chega a abrir um aviso
 * nem uma dica — não há uma única chamada a toast() fora da própria
 * biblioteca —, mas as três subiam em toda visita. Saíram.
 */
const App = () => (
  <ThemeProvider>
    <ServiceWorkerUpdate />
    <BrowserRouter>
      {/* Sem tela de carregamento: o fundo do body já é o da página, então
          a troca de pedaço não pisca nada entre um e outro. */}
      <Suspense fallback={null}>
        <Routes>
          {/* Rota principal (Landing Page) */}
          <Route path="/" element={<Index />} />

          {/* Quadro de vagas — tem HTML próprio (vagas.html) para o SEO */}
          <Route path="/vagas" element={<Vacancies />} />

          {/* Nova rota Cyber Link */}
          <Route path="/bio" element={<GhcBio />} />

          {/* Rota 404 (sempre por último) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
