import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: 10000,
    modelName: "gpt-3.5-turbo-16k",
});

const getPrompt = (text: string) => {
    return `
    
    ---BEGIN INSTRUCTIONS---
    Identify and extract mcqs questions from the given text in the below mentioned format.
    Provide your response strictly as an array of JSON object of the following format and do not write anything else :-:

    TEXT : ${text}


    ---BEGIN FORMAT TEMPLATE---
    
    [
        {
            "Question": "",
            "QuestionNumber": "",
            "Option1": "",
            "Option2": "",
            "Option3": "",
            "Option4": "",
            "Option5": "",
            "CorrectOption": "",
        },
        
    ]

    where, every key value in the JSON object should be strictly of type string with proper formatting.

    ---END FORMAT TEMPLATE---


    

    ---END INSTRUCTIONS--- 
    `;
};

export const getQuestions = async (extractedText: string) => {
    const firstHalf = extractedText.slice(
        0,
        Math.floor(extractedText.length / 2)
    );

    return mockData;
    console.log("Generating questions...");
    console.time("llm call");
    // console.log(res);
    const res = await llm.call(getPrompt(firstHalf));
    console.timeEnd("llm call");
    return res;
};
