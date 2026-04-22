import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),

    mode === "development" && componentTagger(),

    VitePWA({
      // "prompt" → exibe notificação para o usuário antes de atualizar
      // (não recarrega a página sem aviso)
      registerType: "prompt",

      // Não gera manifest PWA — queremos só o Service Worker
      manifest: false,

      // Não ativa o SW em dev (evita confusão durante desenvolvimento)
      devOptions: { enabled: false },

      workbox: {
        // Todos os assets gerados pelo Vite ficam em cache via precaching
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff,woff2}",
        ],

        // Remove automaticamente caches de versões anteriores no ativamento
        cleanupOutdatedCaches: true,

        // O novo SW assume o controle de todas as abas abertas imediatamente
        clientsClaim: true,

        // SPA fallback: qualquer rota serve o index.html
        navigateFallback: "/index.html",

        // Não cacheia rotas de API ou o próprio SW
        navigateFallbackDenylist: [/^\/api\//, /sw\.js$/],

        // Runtime caching: Google Fonts (CacheFirst — raramente mudam)
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 ano
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
