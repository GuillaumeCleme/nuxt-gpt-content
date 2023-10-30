import fs from 'fs';
import { execSync } from 'child_process'
import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { parseMarkdown } from '@nuxtjs/mdc/dist/runtime'
import localstub from './models/localstub';

export default defineNitroPlugin((nitroApp) => {

    // console.log(nitroApp)

    // console.log(nitroApp.hooks)

    // @ts-ignore
    nitroApp.hooks.hook('content:file:beforeParse', async (file: {_id: string, body: string}) => {

        let parsedContent, matches;
        if(file._id.endsWith('.md')){
            //Front-matter keys
            parsedContent = await parseMarkdown(file.body);
            matches = file.body.match(/\${gpt_[_\w-]*}/) ?? [];
        }
        else{
            //Plain keys e.g. ${gpt_content=Write me a prompt}
            //matches = file.body.match(/\${gpt_[_\w-]*\=.*}/) ?? [];
            console.warn('Only markdown files are supported in this version')
        }

        if(matches && parsedContent){
            for(const match of matches){
                const lookup = parsedContent.data[unwrapVariable(match)]
                console.log(lookup)

                const results = localstub(lookup)
    
                if(!results.results){
                    console.error("Could not get content from model: " + results.error);
                }
                else{
                    file.body = file.body.replaceAll(match, results.results[0]);

                    //If options
                    fs.writeFileSync(getFilePath(file), file.body);
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
