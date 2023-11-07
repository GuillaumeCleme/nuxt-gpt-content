import { execSync } from 'child_process'
import { ModuleOptions } from '../module';

export function commitHook(options: ModuleOptions){
    try {
        executeCommand('git version');
    } catch (error) {
        throw new Error(`Could not find 'git', is it installed? Error: ${error}`);
    }

    const commitOptions = typeof options.commitHook == "object" ? options.commitHook : undefined;

    executeCommand('git add .')
    executeCommand('git config user.name "' + commitOptions?.commitAuthorName ?? 'Nuxt GPT Content' + '"')
    executeCommand('git config user.email "' + commitOptions?.commitAuthorEmail ?? 'no-reply@nuxt.com' + '"')
    executeCommand('git commit -m "' + commitOptions?.commitMessage ?? 'Adding content changes' + '"')
    executeCommand('git push')
}

function executeCommand(command: string){
    console.debug("Executing:" + command)                
    try {
        return execSync(command);        
    } catch (error) {
        throw new Error(`Could not execute: '${command}'. Error: ${error}`);
    }
}