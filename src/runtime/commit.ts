import { execSync } from 'child_process'
import { ModuleOptions } from '../module';

import { useLogger } from '@nuxt/kit'

export function commitHook(options: ModuleOptions){

    const logger = useLogger('nuxt-gpt-content');

    try {
        executeCommand('git version');
    } catch (error) {
        throw new Error(`Could not find 'git', is it installed? Error: ${error}`);
    }

    const commitOptions = typeof options.commitHook == "object" ? options.commitHook : {};

    const gitStatus = executeCommand('git status --porcelain');

    if(gitStatus.toString().trim()){
        executeCommand('git add .')
        executeCommand(`git config user.name "${commitOptions.commitAuthorName ?? 'Nuxt GPT Content'}"`)
        executeCommand(`git config user.email "${commitOptions.commitAuthorEmail ?? 'no-reply@nuxt.com'}"`)
        executeCommand(`git commit -m "${commitOptions.commitMessage ?? 'Adding content changes'}"`)

        if(commitOptions.push){
            executeCommand('git push')
        }
    }
    else{
        logger.info("Nothing to commit");
    }
}

function executeCommand(command: string){
    const logger = useLogger('nuxt-gpt-content');
    logger.debug(`Executing: ${command}`);                
    try {
        return execSync(command);        
    } catch (error) {
        throw new Error(`Could not execute: '${command}'. Error: ${error}`);
    }
}