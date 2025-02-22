// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  
  devtools: { enabled: true },

  app: {
    head: {
      // remove body margin and padding
      bodyAttrs: {
        class: "m-0 p-0",
      },
      title: "Telegram Web App Nuxt Demo",
      script: [{ src: 'https://telegram.org/js/telegram-web-app.js' }],
    },
  },

  modules: [
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
  ],

  $development: {
    vite: {
      server: {
        allowedHosts: ['stupid-berries-knock.loca.lt'],
      },
    },
  },

  eslint: {
    exclude: ["node_modules", ".output", ".nuxt", ".git"],
    lintOnStart: false,
    emitError: true,
    emitWarning: true,
    failOnError: false,
    failOnWarning: false,
  },

  // css: [
  //   "~/assets/styles/index.scss",
  // ],

  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {},
  },
})
