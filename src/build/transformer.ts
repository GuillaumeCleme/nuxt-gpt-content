// @ts-expect-error avoid lint error
import { defineTransformer } from '@nuxt/content/transformers'

export default defineTransformer({
    name: 'nuxt-gpt-content-transformer',
    extensions: ['.md'],
    parse(_id: string, rawContent: string) {
        return {
            _id,
            body: rawContent.replaceAll('$', '#')
        }
    }
})