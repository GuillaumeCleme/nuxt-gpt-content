import OpenAI from 'openai';
import fs from 'fs';
import { execSync } from 'child_process'
import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { parseMarkdown } from '@nuxtjs/mdc/dist/runtime'

const openai = new OpenAI({
    apiKey: process.env.NUXT_OPENAI_API_KEY
});

export default defineNitroPlugin((nitroApp) => {

    // console.log(nitroApp)

    // console.log(nitroApp.hooks)

    // @ts-ignore
    nitroApp.hooks.hook('content:file:beforeParse', async (file: {_id: string, body: string}) => {

        const parsedContent = await parseMarkdown(file.body)

        const matches = file.body.match(/\${gpt_[_\w-]*}/) ?? [];

        for(const match of matches){
            const lookup = parsedContent.data[unwrapVariable(match)];
            console.log(lookup)

            // const chatCompletion = await openai.chat.completions.create({
            //     messages: [{ role: 'user', content: lookup }],
            //     model: 'gpt-3.5-turbo',
            //     temperature: 0.8,
            //     n: 1,
            //     max_tokens: 250
            // });

            const chatCompletion = {
                choices: [
                    {
                        message: {
                            content: 'This came from GPT'
                        },
                        finish_reason: 'Done'
                    }
                ]
            }

            if(!chatCompletion.choices[0].message.content){
                console.error("Could not get content from OpenAI: " + chatCompletion.choices[0].finish_reason);
            }
            else{
                file.body = file.body.replaceAll(match, chatCompletion.choices[0].message.content);
                fs.writeFileSync(getFilePath(file), file.body);
            }
        }


    })
})

function getFilePath(file: {_id: string, body: string}){
    return './' + file._id.replaceAll(':', '/');
}

function unwrapVariable(variable: string){
    return variable.replaceAll(/[\$\{\}]/g, '');
}