import { PromptTemplate } from "langchain/prompts";

const prompt = new PromptTemplate({
    inputVariables: ["text"],
    template: `
    
    ---BEGIN INSTRUCTIONS---
    Identify and extract mcqs questions from the given text in the below mentioned format.

    TEXT : {text}

    ---BEGIN FORMAT TEMPLATE---
    
    [
        
        "Question": "",
        "QuestionNumber": "",
        "Option1": "",
        "Option2": "",
        "Option3": "",
        "Option4": "",
        "Option5": "",
        "CorrectOption": "",
        
    ]

    ---END FORMAT TEMPLATE---


    Provide your response strictly as an array of JSON object of the following format and do not write anything else :-:

    ---END INSTRUCTIONS--- 
    `,
});

const injectedPrompt = prompt.format({
    text: "",
});
