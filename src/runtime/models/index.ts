import { ModuleOptions } from "~/src/module"

export interface ModelResults {
    results?: Array<string>,
    error?: string
}

export interface Model {
    generateContent(message: string): Promise<ModelResults> | ModelResults
}