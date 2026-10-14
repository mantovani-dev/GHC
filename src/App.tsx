import { Component, lazy, Suspense, type ComponentType, type ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";

/**
 * Limpa o estado herdado e recarrega, uma única vez por sessão.
 *
 * Usada quando o navegador pede um arquivo que não existe mais — o caso de
 * quem tem um pacote antigo guardado e os nomes com hash já mudaram.
 */
const limparERecarregar = async () => {
  try {
    const regs = (await navigator.serviceWorker?.getRegistrations?.()) ?? [];
    await Promise.all(regs.map((r) => r.unregister()));
    if (window.caches) {
      const chaves = await caches.keys();
      await Promise.all(chaves.map((k) => caches.delete(k)));
    }
  } catch {
    /* não importa o motivo: o recarregamento abaixo é o que resolve */
  }
  window.location.reload();
};

/**
 * Carrega a rota e, se o arquivo tiver sumido, se recupera sozinha.
 *
 * Sem isto, um pedaço de rota ausente derruba a página inteira e não há
 * como sair disso de dentro do site — era o que obrigava a abrir em janela
 * anônima.
 */
const rota = (importar: () => Promise<{ default: ComponentType }>) =>
  lazy(() =>
    importar().catch((erro) => {
      if (sessionStorage.getItem("ghc-recarregado")) throw erro;
      sessionStorage.setItem("ghc-recarregado", "1");
      limparERecarregar();
      /* Nunca resolve: a página está indo recarregar de qualquer forma. */
      return new Promise<never>(() => {});
    })
  );

const Index = rota(() => import("./pages/Index"));
const Vacancies = rota(() => import("./pages/Vacancies"));
const GhcBio = rota(() => import("./pages/GhcBio"));
const NotFound = rota(() => import("./pages/NotFound"));

/**
 * Última linha de defesa: em vez de tela branca, uma saída clicável.
 *
 * Se algo estourar fora do caminho previsto acima, o visitante precisa ter
 * como se desbloquear sem saber o que é cache nem janela anônima.
 */
class Salvaguarda extends Component<{ children: ReactNode }, { quebrou: boolean }> {
  state = { quebrou: false };

  static getDerivedStateFromError() {
    return { quebrou: true };
  }

  render() {
    if (!this.state.quebrou) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
        <p className="text-[15px] leading-[1.6] text-foreground/70">
          Não conseguimos carregar esta página. Normalmente é uma versão antiga
          guardada no seu navegador.
        </p>
        <button
          onClick={limparERecarregar}
          className="rounded-full bg-accent px-6 py-3 text-[14px] font-semibold text-accent-foreground"
        >
          Limpar e tentar de novo
        </button>
      </div>
    );
  }
}

const App = () => (
  <ThemeProvider>
    <Salvaguarda>
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
    </Salvaguarda>
  </ThemeProvider>
);

export default App;
