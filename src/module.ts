import { defineNuxtModule, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  commitHook?: boolean | {
    commitAuthorEmail?: string,
    commitAuthorName?: string
  }
  saveContent?: boolean
}

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
  defaults: {
    commitHook: true,
    saveContent: true
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    //Inject Nitro Plugin
    nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.plugins = nitroConfig.plugins ?? []
      nitroConfig.plugins?.push(resolver.resolve('./build/plugin'))
      
      nitroConfig.runtimeConfig = nitroConfig.runtimeConfig ?? {}
      nitroConfig.runtimeConfig.gptcontent = nitroConfig.runtimeConfig.gptcontent ?? options 
    })

    //Register commit hook
    nuxt.hook('close', async () => { 
      if(nuxt.options.ssr && nuxt.options._generate && options.commitHook){
        console.log('Run commit hook');

      }
    })
  }
})