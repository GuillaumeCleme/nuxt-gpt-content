import { ModuleOptions } from "~/src/module";
import { ModelResults, Model } from ".";
import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.NUXT_OPENAI_API_KEY
});


export default class OpenAIModel implements Model {
    
    config: ModuleOptions;

    constructor(config: ModuleOptions){
        this.config = config;
    }

    async generateContent(message: string): Promise<ModelResults> {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: message }],
            model: this.config.contentModelName,
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
}