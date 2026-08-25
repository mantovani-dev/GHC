/**
 * Fundo ambiente do sistema Órbita: grid luminoso + auréolas ciano.
 *
 * CSS puro, sem canvas nem partículas — custo zero de runtime. As regras
 * ficam em index.css porque `mask-image` com radial-gradient e os
 * `filter: blur(130px)` não sobrevivem bem a valores arbitrários do Tailwind.
 *
 * O grid é `fixed`: a máscara radial dele (ellipse 100% 55% at 50% 0%) foi
 * desenhada para uma altura de viewport, e esticada na altura do documento
 * não fecharia. Já as auréolas são `absolute` e acompanham a página, nas
 * coordenadas do protótipo — no container fixo elas cairiam fora e o
 * `overflow: hidden` cortaria as duas de baixo.
 *
 * Exige um ancestral `relative` cobrindo a página inteira (ver Index.tsx).
 */
const AmbientBackground = () => (
  <>
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="ambient-grid" />
    </div>

    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />
    </div>
  </>
);

export default AmbientBackground;
