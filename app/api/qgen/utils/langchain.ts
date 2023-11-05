// import { OpenAI } from "langchain/llms/openai";
import { OpenAI } from "langchain/llms/openai";
import { mockData } from "./mockdata";

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: -1,
    modelName: "gpt-3.5-turbo",
    // callbacks: [
    //     {
    //         handleLLMEnd: (output, runId, parentRunId?, tags?) => {
    //             console.log(output);
    //             const { completionTokens, promptTokens, totalTokens } =
    //                 output.llmOutput?.tokenUsage;
    //             totalCompletionTokens += completionTokens ?? 0;
    //             totalPromptTokens += promptTokens ?? 0;
    //             totalExecutionTokens += totalTokens ?? 0;

    //             console.log("Total tokens used: ", totalExecutionTokens);
    //             console.log("Total Completion Tokens: ", totalCompletionTokens);
    //             console.log("Total Prompt Tokens: ", totalPromptTokens);
    //         },
    //     },
    // ],
});

export const getPrompt = (text: string) => {
    return `
    
    ---BEGIN INSTRUCTIONS---
    Identify and extract mcqs questions from the given text in the below mentioned format all the question and options should be added in the format template given below without any additional flags or prefixes.
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

export const getQuestions = async (extractedText: string): Promise<any> => {
    const firstHalf = extractedText.slice(
        0,
        Math.floor(extractedText.length / 8)
    );

    return mockData;
    console.log("Generating questions...");
    console.time("llm call");

    try {
        const res = await llm.call(getPrompt(extractedText));

        // console.log(res);
        console.timeEnd("llm call");
        return res;
    } catch {
        console.timeEnd("llm call");
        console.error("Error in generating questions");
        return "";
    }
};
