import { ModuleOptions } from "../../module";
import { Model, ModelResults } from ".";
import { resolve } from "path";
import fs from 'fs';
import { useLogger } from "@nuxt/kit";

export default class LocalStub implements Model {

    config: ModuleOptions;

    constructor(config: ModuleOptions){
        this.config = config;
    }

    generateContent(message: string): ModelResults {

        const logger = useLogger('nuxt-gpt-content');

        let systemPrompt;
        if(this.config.contentModelSystemPrompt){
            const systemPromptPath = resolve(this.config.contentModelSystemPrompt);
            systemPrompt = fs.readFileSync(systemPromptPath);
        }

        return {
            results: [
                `This content came form a local stub model. Received: [${message}] and system prompt: [${systemPrompt}]`
            ]
        }
    }
}