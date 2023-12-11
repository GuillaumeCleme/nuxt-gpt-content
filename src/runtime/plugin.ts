import fs from 'fs';
import { parseMarkdown } from '@nuxtjs/mdc/dist/runtime'
import { ModuleOptions } from '../module';

import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import { useRuntimeConfig } from '#imports'

import OpenAIModel from './models/openai';
import LocalStub from './models/localstub';

import { useLogger } from '@nuxt/kit'

export default defineNitroPlugin((nitroApp) => {

    // @ts-ignore
    nitroApp.hooks.hook('content:file:beforeParse', async (file: {_id: string, body: string}, event) => {

        // @ts-ignore
        const config = useRuntimeConfig(event)?.gptcontent as ModuleOptions | undefined;
        const logger = useLogger('nuxt-gpt-content');

        //Return if not active
        if(!config?.active){
            logger.warn('Plugin set to inactive, skipping');
            return;
        }

        let parsedContent, matches;
        if(file._id.endsWith('.md')){
            //Front-matter keys
            parsedContent = await parseMarkdown(file.body);
            matches = file.body.match(/\${gpt_[_\w-]*}/) ?? [];
        }
        else{
            //Plain keys e.g. ${gpt_content=Write me a prompt}
            //matches = file.body.match(/\${gpt_[_\w-]*\=.*}/) ?? [];
            logger.warn('Only markdown files are supported in this version')
        }

        if(matches && parsedContent){
            for(const match of matches){
                const lookup = parsedContent.data[unwrapVariable(match)]

                let results;
                logger.info(`Invoking model: ${config?.contentModelProvider}`);
                switch (config?.contentModelProvider) {
                    case 'openai':
                        results = await new OpenAIModel(config).generateContent(lookup);
                        break;
                    default:
                        results = new LocalStub(config).generateContent(lookup);
                        break;
                }
    
                if(!results.results){
                    logger.error("Could not get content from model: " + results.error);
                }
                else{
                    file.body = file.body.replaceAll(match, results.results[0]);

                    if(config?.saveContent){
                        logger.info('Saving file content');
                        fs.writeFileSync(getFilePath(file), file.body);
                    }
                    else{
                        logger.info('Skipping file save');
                    }
                }
            }
        }
    })
})

function getFilePath(file: {_id: string, body: string}){
    return './' + file._id.replaceAll(':', '/');
}

function unwrapVariable(variable: string){
    return variable.substring(2, variable.length-1);
}

function splitVariable(variable: string) {
    variable = unwrapVariable(variable)
    return variable.slice(variable.indexOf('=')+1, variable.length);
}
