# Nuxt GPT Content

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
![Status][status-src]

A Nuxt Content module capable of enhancing content creation via GPT APIs by querying a variety of models. Write content in your content files and include prompts that will be sent to Large Language Models (LLMs) such as OpenAI's GPT to generate and augment your content in order to quickly release new pages, posts, and any type of content you wish to manage.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-gpt-content?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 📃 Support for Markdown files and Front-Matter variables and prompts
- 🤖 Support for OpenAI models such as GPT3.5 and GPT4
- 🚀 Direct integration within Nuxt Content `^2.0.0` and Nuxt `^3.0.0` projects

## Quick Setup

1. Add `nuxt-gpt-content` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-gpt-content

# Using yarn
yarn add --dev nuxt-gpt-content

# Using npm
npm install --save-dev nuxt-gpt-content
```

2. Add `nuxt-gpt-content` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-gpt-content'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Configuration

1. Add a `gpt-content` configuration object to your `nuxt.config.ts` file

    ```js
    export default defineNuxtConfig({
    gptcontent: {
        active: true, //True by default but can be turned off
        contentModelProvider: 'openai', //`openai` or `none` for testing
        contentModelName: 'gpt-3.5-turbo', //Any supported OpenAI model name
        contentModelOptions: { //Any supported parameters to pass to the model config
            temperature: 0.8,
            n: 1,
            max_tokens: 250
        },
        commitHook: true, //Boolean or object containing commit details. Used to verify if a commit hook run after content files have been modified.
        saveContent: false //Should content files be updated and saved locally?
    },
    })
    ```
1. Ensure a you set an environment variable named `NUXT_OPENAI_API_KEY` with the value of you OpenAI API key.

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

## License

[MIT License](https://github.com/GuillaumeCleme/nuxt-gpt-content/LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-gpt-content/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-gpt-content

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-gpt-content.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-gpt-content

[license-src]: https://img.shields.io/npm/l/nuxt-gpt-content.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-gpt-content

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com

[status-src]: https://img.shields.io/badge/Status-Experiemental-blue