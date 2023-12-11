export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/content'
  ],
  gptcontent: {
    contentModelProvider: 'none',
    contentModelSystemPrompt: './content/_system-prompt.md',
    saveContent: false,
    commitHook: false
  },
  devtools: { enabled: true }
})
