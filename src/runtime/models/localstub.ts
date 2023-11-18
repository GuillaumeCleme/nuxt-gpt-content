import { Model, ModelResults } from ".";

export default class LocalStub implements Model {
    generateContent(message: string): ModelResults {
        return {
            results: [
                `This content came form a local stub model. Received: ${message}`
            ]
        }
    }
}