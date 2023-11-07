import { ModuleOptions } from "~/src/module";
import { ModelResults } from ".";
import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.NUXT_OPENAI_API_KEY
});

export default async function (message: string, config: ModuleOptions): Promise<ModelResults> {

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        max_tokens: 250
    });

    if(!chatCompletion.choices[0].message.content){
        console.error("Could not get content from OpenAI: " + chatCompletion.choices[0].finish_reason);
        return {
            error: chatCompletion.choices[0].finish_reason
        }
    }
    else{
        return {
            results: [
                chatCompletion.choices[0].message.content
            ]
        }
    }
}