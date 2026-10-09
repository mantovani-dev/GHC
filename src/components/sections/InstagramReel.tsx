import { useEffect, useRef, useState } from "react";

interface InstagramReelProps {
  /** URL do /embed do reel. */
  src: string;
  title: string;
}

/**
 * Reel do Instagram que só entra quando a pessoa chega perto dele.
 *
 * O incorporado do Instagram custava 1,2 s na medição — oito vezes mais que
 * qualquer outro recurso da home — e disputava banda com o herói, que é o
 * que a pessoa está realmente esperando ver. O `loading="lazy"` do iframe
 * não resolvia: o navegador considera a margem dele generosa demais e
 * começava a busca quase junto com o resto.
 *
 * Aqui a decisão é nossa: o iframe só é criado quando a moldura entra na
 * faixa de 300px antes da viewport. Quem nunca rola até os depoimentos
 * nunca paga por ele.
 *
 * A moldura ocupa o mesmo espaço desde o começo, então nada salta quando o
 * conteúdo chega.
 */
const InstagramReel = ({ src, title }: InstagramReelProps) => {
  const moldura = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const alvo = moldura.current;
    if (!alvo) return;

    /* Sem IntersectionObserver (navegador antigo), carrega direto: melhor
       mostrar o conteúdo do que escondê-lo por causa da otimização. */
    if (typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }

    let entregou = false;

    const observador = new IntersectionObserver(
      (entradas) => {
        entregou = true;
        if (entradas.some((e) => e.isIntersecting)) {
          setVisivel(true);
          observador.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observador.observe(alvo);

    /* Rede de segurança, a mesma convenção do AnimateIn: há ambientes em que
       o IntersectionObserver existe mas nunca entrega retorno (confirmei um
       aqui). Se em 4s nada chegou, mostra assim mesmo — o reel atrasar é
       aceitável, sumir não é. O prazo é maior que os 1200ms do AnimateIn
       porque aqui o objetivo é justamente sair do caminho da abertura. */
    const rede = window.setTimeout(() => {
      if (!entregou) setVisivel(true);
    }, 4000);

    return () => {
      observador.disconnect();
      window.clearTimeout(rede);
    };
  }, []);

  return (
    <div className="reel" ref={moldura}>
      {visivel ? (
        <iframe
          src={src}
          className="block w-full min-h-[600px] sm:min-h-[660px] md:min-h-[700px]"
          frameBorder="0"
          scrolling="no"
          allow="encrypted-media"
          title={title}
          loading="lazy"
        />
      ) : (
        /* Mesma altura do iframe, para a página não saltar quando ele entrar */
        <div
          className="block w-full min-h-[600px] sm:min-h-[660px] md:min-h-[700px]"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default InstagramReel;
