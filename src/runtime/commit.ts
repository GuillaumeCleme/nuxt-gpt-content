import { execSync } from 'child_process'
import { ModuleOptions } from '../module';
import { ConsolaInstance } from 'consola'


export function commitHook(options: ModuleOptions, logger: ConsolaInstance){
    try {
        executeCommand('git version', logger);
    } catch (error) {
        throw new Error(`Could not find 'git', is it installed? Error: ${error}`);
    }

    const commitOptions = typeof options.commitHook == "object" ? options.commitHook : {};

    executeCommand('git add .', logger)
    executeCommand('git config user.name "' + commitOptions.commitAuthorName ?? 'Nuxt GPT Content' + '"', logger)
    executeCommand('git config user.email "' + commitOptions.commitAuthorEmail ?? 'no-reply@nuxt.com' + '"', logger)
    executeCommand('git commit -m "' + commitOptions.commitMessage ?? 'Adding content changes' + '"', logger)
    executeCommand('git push', logger)
}

function executeCommand(command: string, logger: ConsolaInstance){
    logger.debug(`Executing: ${command}`);                
    try {
        return execSync(command);        
    } catch (error) {
        throw new Error(`Could not execute: '${command}'. Error: ${error}`);
    }
}