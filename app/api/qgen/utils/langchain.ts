import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: 1000,
    modelName: "gpt-3.5-turbo",
});

const prompt = new PromptTemplate({
    inputVariables: ["text"],
    template: `
    
    ---BEGIN INSTRUCTIONS---
    Identify and extract mcqs questions from the given text in the below mentioned format.

    TEXT : {text}

    ---BEGIN FORMAT TEMPLATE---
    
    [
        QUESTION
            A) ANSWER 1
            B) ANSWER 2
            C) ANSWER 3
            D) ANSWER 4
    ]

    ---END FORMAT TEMPLATE---


    Provide your response strictly as an array of JSON object of the following format and do not write anything else :-:

    ---END INSTRUCTIONS--- 
    `,
});

export const getQuestions = async (extractedText: string) => {
    const injectedPrompt = await prompt.format({
        text: extractedText,
    });

    console.time("llm call");
    const res = await llm.call(injectedPrompt);
    console.timeEnd("llm call");
    console.log(res);
    return res;
};
