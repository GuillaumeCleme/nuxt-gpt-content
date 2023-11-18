import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { commitHook } from './runtime/commit'


// Module options TypeScript interface definition
export interface ModuleOptions {
    contentModelProvider: string
    contentModelName: string
    contentModelOptions?: Record<string, any>,
    commitHook: boolean | {
        commitAuthorEmail?: string,
        commitAuthorName?: string,
        commitMessage?: string,
    }
    saveContent: boolean
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
        contentModelProvider: 'openai',
        contentModelName: 'gpt-3.5-turbo',
        contentModelOptions: {
            temperature: 0.8,
            n: 1,
            max_tokens: 250
        },
        commitHook: true,
        saveContent: false
    },
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url)

        //Inject Nitro Plugin
        nuxt.hook('nitro:config', async (nitroConfig) => {
            nitroConfig.plugins = nitroConfig.plugins ?? []
            nitroConfig.plugins?.push(resolver.resolve('./runtime/plugin'))

            nitroConfig.runtimeConfig = nitroConfig.runtimeConfig ?? {}
            nitroConfig.runtimeConfig.gptcontent = nitroConfig.runtimeConfig.gptcontent ?? options
        })

        //Register commit hook
        nuxt.hook('close', async () => {
            if (nuxt.options.ssr && nuxt.options._generate && options.commitHook) {
                commitHook(options);
            }
        })
    }
})