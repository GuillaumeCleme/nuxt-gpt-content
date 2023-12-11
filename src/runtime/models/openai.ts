import { ModuleOptions } from "../../module";
import { ModelResults, Model } from ".";
import OpenAI from 'openai';
import { resolve } from "path";
import fs from 'fs';
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";


const openai = new OpenAI({
    apiKey: process.env.NUXT_OPENAI_API_KEY
});


export default class OpenAIModel implements Model {
    
    config: ModuleOptions;

    constructor(config: ModuleOptions){
        this.config = config;
    }

    async generateContent(message: string): Promise<ModelResults> {

        const messages: ChatCompletionMessageParam[] = [];
        if(this.config.contentModelSystemPrompt){
            const systemPromptPath = resolve(this.config.contentModelSystemPrompt);
            const systemPrompt = fs.readFileSync(systemPromptPath).toString();
            messages.push({ role: "system", content: systemPrompt });
        }

        messages.push({ role: "user", content: message });

        const chatCompletion = await openai.chat.completions.create({
            messages,
            model: this.config.contentModelName,
            ...this.config.contentModelOptions
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