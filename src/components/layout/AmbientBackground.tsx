/**
 * Fundo ambiente do sistema Órbita: grid luminoso + auréolas ciano.
 *
 * CSS puro, sem canvas nem partículas — custo zero de runtime. As regras
 * ficam em index.css porque `mask-image` com radial-gradient e os
 * `filter: blur(130px)` não sobrevivem bem a valores arbitrários do Tailwind.
 */
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="ambient-grid" />
    <div className="ambient-glow ambient-glow-1" />
    <div className="ambient-glow ambient-glow-2" />
    <div className="ambient-glow ambient-glow-3" />
  </div>
);

export default AmbientBackground;
