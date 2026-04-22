import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";

/**
 * UpdatePrompt
 *
 * Registra o Service Worker e monitora novas versões.
 * Quando um deploy novo é detectado, exibe um toast persistente
 * com botão para o usuário recarregar e aplicar a atualização.
 *
 * Renderiza null — sem UI própria, usa o Sonner já presente no App.
 */
const UpdatePrompt = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // Verifica atualizações a cada 60 minutos enquanto a aba está aberta
    onRegistered(registration) {
      if (registration) {
        setInterval(() => registration.update(), 60 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      console.warn("[SW] Falha ao registrar o Service Worker:", error);
    },
  });

  useEffect(() => {
    if (!needRefresh) return;

    toast("Nova versão disponível 🚀", {
      id: "sw-update",             // evita duplicatas
      duration: Infinity,          // persiste até o usuário agir
      description: "Atualize agora para garantir que está vendo a versão mais recente.",
      action: {
        label: "Atualizar",
        onClick: () => updateServiceWorker(true),
      },
    });
  }, [needRefresh, updateServiceWorker]);

  return null;
};

export default UpdatePrompt;
