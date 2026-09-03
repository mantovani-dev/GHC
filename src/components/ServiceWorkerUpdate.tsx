import { useRegisterSW } from "virtual:pwa-register/react";

/**
 * ServiceWorkerUpdate
 *
 * Registra o Service Worker e, de hora em hora, pergunta ao servidor se
 * saiu versão nova. Como o build usa `registerType: "autoUpdate"`, quando
 * sai, ela assume sozinha — não há aviso para o visitante confirmar.
 *
 * O intervalo existe para a aba que fica aberta muito tempo: sem ele, a
 * checagem só aconteceria no carregamento da página.
 *
 * Renderiza null — não tem UI.
 */
const ServiceWorkerUpdate = () => {
  useRegisterSW({
    onRegistered(registration) {
      if (!registration) return;
      setInterval(() => registration.update(), 60 * 60 * 1000);
    },
    onRegisterError(error) {
      console.warn("[SW] Falha ao registrar o Service Worker:", error);
    },
  });

  return null;
};

export default ServiceWorkerUpdate;
