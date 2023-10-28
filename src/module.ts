import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { resolve } from 'path'
import transformer from './build/transformer'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-gpt-content',
    configKey: 'gptcontent',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0'
    },
  },
  // hooks: {
  //   'app:error': (err) => {
  //     console.info(`This error happened: ${err}`);
  //   }
  // },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup (_options, nuxt) {
    const resolver = createResolver(import.meta.url)


    console.log('setting up module')
    // // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    // const plugin = addPlugin(resolver.resolve('./build/transformer'))

    // nuxt.options.nitro.externals = nuxt.options.nitro.externals || {}
    // nuxt.options.nitro.externals.inline = nuxt.options.nitro.externals.inline || []
    // nuxt.options.nitro.externals.inline.push(resolve('./module'))
    // @ts-ignore
    // nuxt.hook('content:file:beforeParse', (contentContext) => {
    //   console.log('hook!')
    // })

    nuxt.hook('nitro:config', async (nitroConfig) => {

      console.log('pushing into plugins: ', resolver.resolve('./build/transformer'))
      nitroConfig.plugins = nitroConfig.plugins ?? []
      nitroConfig.plugins?.push(resolver.resolve('./build/transformer'))
      console.log(nitroConfig.plugins)


      // @ts-ignore
      // nitro.hooks.hook('content:file:beforeParse', (file) => {
      //   console.log('Processing content hook')
      //   if (file._id.endsWith('.md')) {
      //     file.body = file.body.replaceAll('$', '#');
      //   }
      // })
    })
  }
})