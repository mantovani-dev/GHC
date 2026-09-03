import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";
import type { Plugin, HtmlTagDescriptor } from "vite";
import { jobPostingSchemas, organizationSchema, seoMeta, SITE_URL } from "./src/lib/job-schema";
import { VACANCIES_UPDATED_AT } from "./src/data/vacancies";

/**
 * Injeta as tags de SEO direto no HTML servido, por página.
 *
 * Precisa ser em build, e não em runtime: o react-helmet-async 2.0.5 não
 * aplica nada neste projeto, e mesmo funcionando os crawlers de WhatsApp,
 * Facebook e LinkedIn não executam JS — tags de og: injetadas pelo React
 * seriam invisíveis para eles.
 *
 * O JSON-LD de JobPosting entra só em vagas.html: as vagas moram em /vagas,
 * e repetir os 25 anúncios na home e na /bio confundiria o Google Jobs.
 */
const seoTags = (): Plugin => ({
  name: "ghc-seo-tags",

  /* Em dev não existe roteamento de arquivos: /vagas cairia no index.html
     pelo fallback de SPA, e a página não receberia o SEO dela. */
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === "/vagas" || req.url === "/vagas/") req.url = "/vagas.html";
      next();
    });
  },

  transformIndexHtml: {
    order: "pre",
    handler(_html, ctx) {
      const isVacancies = ctx.path.includes("vagas");
      const page = isVacancies ? seoMeta.vacancies : seoMeta.home;
      const url = SITE_URL + page.path;

      const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({
        tag: "meta",
        attrs,
        injectTo: "head",
      });

      const ld: HtmlTagDescriptor[] = (
        isVacancies ? [organizationSchema(), ...jobPostingSchemas()] : [organizationSchema()]
      ).map((schema) => ({
        tag: "script",
        attrs: { type: "application/ld+json" },
        children: JSON.stringify(schema),
        injectTo: "head",
      }));

      return [
        { tag: "title", children: page.title, injectTo: "head" },
        meta({ name: "description", content: page.description }),
        meta({ name: "keywords", content: page.keywords }),
        meta({ name: "author", content: "Global Hiring & Careers" }),
        meta({ name: "robots", content: "index, follow, max-image-preview:large" }),
        { tag: "link", attrs: { rel: "canonical", href: url }, injectTo: "head" },
        meta({ property: "og:site_name", content: "Global Hiring & Careers (GHC)" }),
        meta({ property: "og:title", content: page.title }),
        meta({ property: "og:description", content: page.description }),
        meta({ property: "og:type", content: "website" }),
        meta({ property: "og:url", content: url }),
        meta({ property: "og:locale", content: "pt_BR" }),
        meta({ name: "twitter:card", content: "summary_large_image" }),
        meta({ name: "twitter:title", content: page.title }),
        meta({ name: "twitter:description", content: page.description }),
        ...ld,
      ];
    },
  },

  /* Sitemap com o lastmod vindo da data do quadro de vagas */
  generateBundle() {
    const urls = [
      { loc: SITE_URL + "/", priority: "1.0", changefreq: "weekly" },
      { loc: SITE_URL + "/vagas", priority: "0.9", changefreq: "weekly" },
      { loc: SITE_URL + "/bio", priority: "0.5", changefreq: "monthly" },
    ];
    const body = urls
      .map(
        (u) =>
          `  <url><loc>${u.loc}</loc><lastmod>${VACANCIES_UPDATED_AT}</lastmod>` +
          `<changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
      )
      .join("\n");

    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        body,
        "</urlset>",
        "",
      ].join("\n"),
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),

    seoTags(),

    mode === "development" && componentTagger(),

    VitePWA({
      // "autoUpdate" → a versão nova assume sozinha na próxima visita.
      //
      // Era "prompt", que deixava o Service Worker novo em espera até o
      // visitante clicar num aviso. Num site de vagas isso é perigoso: quem
      // não clicasse continuaria vendo o quadro antigo por tempo indefinido
      // e poderia se inscrever numa vaga já encerrada.
      registerType: "autoUpdate",

      // Não gera manifest PWA — queremos só o Service Worker
      manifest: false,

      // Não ativa o SW em dev (evita confusão durante desenvolvimento)
      devOptions: { enabled: false },

      workbox: {
        // Precache apenas JS, CSS, HTML e assets pequenos (fontes, ícones, logos)
        // Imagens grandes do carrossel ficam fora — o cache HTTP do Netlify já as serve
        globPatterns: [
          "**/*.{js,css,html,ico,svg,woff,woff2}",
        ],

        // Limite de 500 KB por arquivo no precache (segurança extra)
        maximumFileSizeToCacheInBytes: 500 * 1024,

        // Remove automaticamente caches de versões anteriores no ativamento
        cleanupOutdatedCaches: true,

        // O novo SW assume o controle de todas as abas abertas imediatamente
        clientsClaim: true,

        // SPA fallback: qualquer rota serve o index.html
        navigateFallback: "/index.html",

        // /vagas tem HTML próprio: se caísse no fallback receberia o <head>
        // da home. Fora isso, não cacheia rotas de API nem o próprio SW.
        navigateFallbackDenylist: [/^\/vagas/, /^\/api\//, /sw\.js$/],

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

  /* Duas entradas de HTML: a home e o quadro de vagas, cada uma com o
     seu próprio <head>. O app React é o mesmo nas duas. */
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        vagas: path.resolve(__dirname, "vagas.html"),
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
