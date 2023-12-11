import { defineNuxtModule, createResolver, useLogger } from '@nuxt/kit'
import { commitHook } from './runtime/commit'


// Module options TypeScript interface definition
export interface ModuleOptions {
    contentModelProvider: "openai" | "none"
    contentModelName: "gpt-3.5-turbo-1106" | "gpt-3.5-turbo" | "gpt-4" | "gpt-4-32k" | string
    contentModelOptions?: Record<string, any>,
    contentModelSystemPrompt?: string,
    commitHook: boolean | {
        commitAuthorEmail?: string,
        commitAuthorName?: string,
        commitMessage?: string,
        push?: boolean
    }
    saveContent: boolean,
    active: boolean
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
    defaults: {
        active: true,
        contentModelProvider: 'openai',
        contentModelName: 'gpt-3.5-turbo',
        contentModelOptions: {
            temperature: 0.8,
            n: 1,
            max_tokens: 250,
        },
        commitHook: true,
        saveContent: false
    },
    setup(options, nuxt) {
        const logger = useLogger('nuxt-gpt-content')
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
            if (options.commitHook) {
                logger.info('Running commit hook');
                commitHook(options);
            }
            else{
                logger.info('Commit hook skipped');
            }
        })
    }
})