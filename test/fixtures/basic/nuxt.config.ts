import nuxtgptcontent from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    nuxtgptcontent
  ],
  gptcontent: {
    contentModelProvider: 'openai',
    contentModelName: 'gpt-3.5-turbo',
    saveContent: true,
    active: true,
    commitHook: true
  },
})
