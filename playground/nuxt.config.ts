export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/content'
  ],
  gptcontent: {
    contentModelProvider: 'none'
  },
  devtools: { enabled: true }
})
