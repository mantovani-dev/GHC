import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import ServiceWorkerUpdate from "@/components/ServiceWorkerUpdate";
import Index from "./pages/Index";
import Vacancies from "./pages/Vacancies";
import NotFound from "./pages/NotFound";
import GhcBio from "./pages/GhcBio";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ServiceWorkerUpdate />
        <BrowserRouter>
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
