import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: -1,
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
        
        Question: "",
        QuestionNumber: "",
        Option1: "",
        Option2: "",
        Option3: "",
        Option4: "",
        Option5: "",
        CorrectOption: "",
        
    ]

    ---END FORMAT TEMPLATE---


    Provide your response strictly as an array of JSON object of the following format and do not write anything else :-:

    ---END INSTRUCTIONS--- 
    `,
});

// "Question",
//     "QuestionType",
//     "CorrectOption",
//     "Option1",
//     "Option2",
//     "Option3",
//     "Option4",
//     "Option5",

const expression = [
    {
        Question: "What is the free luggage allowance?",
        QuestionNumber: "I.13982",
        Option1: "10 kgs",
        Option2: "15 kg",
        Option3: "20 kg",
        Option4: "25kg",
        Option5: "30kg",
        CorrectOption: "e",
    },
    {
        Question:
            "When you reverse the digits of the number 13, the number increases by 18. How many other two-digit numbers increase by 18 when their digits are reversed?",
        QuestionNumber: "83",
        Option1: "5",
        Option2: "6",
        Option3: "7",
        Option4: "8",
        Option5: "10",
        CorrectOption: "b",
    },
    {
        Question:
            "The number of employees in Obelix Menhir Co. is a prime number and is less than 300. The ratio of the number of employees who are graduates and above, to that of employees who are not, can possibly be:",
        QuestionNumber: "84",
        Option1: "101:88",
        Option2: "87:100",
        Option3: "10:111",
        Option4: "85:98",
        Option5: "97:84",
        CorrectOption: "b",
    },
    {
        Question:
            "Consider the set S = {1, 2, 3, 4, ...., 2n+1 }, where n is a positive integer larger than 2007. Define X as the average of the odd integers in S and Y as the average of the even integers in S. What is the value of X–Y?",
        QuestionNumber: "85",
        Option1: "0",
        Option2: "1",
        Option3: "(1/2)n",
        Option4: "(n+1)/2n",
        Option5: "2008",
        CorrectOption: "a",
    },
    {
        Question:
            "Suppose you have a currency, named Miso, in three denominations: 1 Miso, 10 Misos, and 50 Misos. In how many ways can you pay a bill of 107 Misos?",
        QuestionNumber: "86",
        Option1: "17",
        Option2: "16",
        Option3: "18",
        Option4: "15",
        Option5: "19",
        CorrectOption: "b",
    },
    {
        Question:
            "A confused bank teller transposed the rupees and paise when he cashed a cheque for Shailaja, giving her rupees instead of paise and paise instead of rupees. After buying a toffee for 50 paise, Shailaja noticed that she was left with exactly three times as much as the amount on the cheque. Which of the following is a valid statement about the cheque amount?",
        QuestionNumber: "87",
        Option1: "Over ₹13 but less than ₹14",
        Option2: "Over ₹7 but less than ₹8",
        Option3: "Over ₹22 but less than ₹23",
        Option4: "Over ₹18 but less than ₹19",
        Option5: "Over ₹4 but less than ₹5",
        CorrectOption: "e",
    },
    {
        Question: "What are the last two digits of 72008?",
        QuestionNumber: "88",
        Option1: "21",
        Option2: "61",
        Option3: "01",
        Option4: "41",
        Option5: "81",
        CorrectOption: "e",
    },
    {
        Question:
            "A shop stores x kg of rice. The first customer buys half this quantity plus half a kg of rice. The second customer buys half the remaining quantity plus half a kg of rice. The third customer also buys half the remaining quantity plus half a kg of rice. Thereafter, no rice is left in the shop. Which of the following best describes the value of x?",
        QuestionNumber: "89",
        Option1: "2 ≤ x ≤ 6",
        Option2: "5 ≤ x ≤ 8",
        Option3: "9 ≤ x ≤ 12",
        Option4: "11 ≤ x ≤ 14",
        Option5: "13 ≤ x ≤ 18",
        CorrectOption: "d",
    },
    {
        Question:
            "The number of common terms in the two sequences 17, 21, 25,……,417 and 16, 21, 26,….,466 is",
        QuestionNumber: "90",
        Option1: "78",
        Option2: "19",
        Option3: "20",
        Option4: "77",
        Option5: "22",
        CorrectOption: "a",
    },
    {
        Question:
            "The integers 1, 2,…….., 40 are written on a blackboard. The following operation is then repeated 39 times: in each repetition, any two numbers say a and b, currently on the blackboard are erased and a new number a+b–1 is written. What will be the number left on the board at the end?",
        QuestionNumber: "91",
        Option1: "820",
        Option2: "821",
        Option3: "781",
        Option4: "819",
        Option5: "780",
        CorrectOption: "b",
    },
    {
        Question:
            "Three consecutive positive integers are raised to the first, second, and third powers respectively and then added. The sum so obtained is a perfect square, whose square root equals the total of the three original integers. Which of the following best describes the minimum, say m, of these three integers?",
        QuestionNumber: "92",
        Option1: "1 ≤ m ≤ 3",
        Option2: "4 ≤ m ≤ 6",
        Option3: "7 ≤ m ≤ 9",
        Option4: "10 ≤ m ≤ 12",
        Option5: "13 ≤ m ≤ 15",
        CorrectOption: "d",
    },
    {
        Question:
            "The seed of any positive integer n is defined as follows:\nSeed (n) = n, if n < 10\n= seed(s(n)), otherwise,\nwhere s(n) indicates the sum of digits of n. For example,\nseed (7)=7, seed (248)= seed(2+4+8) = seed (14)=seed(1+4)=seed (5)=5, etc. How many positive integers n, such that n < 500, will have seed (n) =9?",
        QuestionNumber: "93",
        Option1: "39",
        Option2: "72",
        Option3: "81",
        Option4: "108",
        Option5: "55",
        CorrectOption: "a",
    },
];

export const getQuestions = async (extractedText: string) => {
    const injectedPrompt = await prompt.format({
        text: extractedText,
    });

    // return expression;
    console.log("Generating questions...");
    console.time("llm call");
    console.timeEnd("llm call");
    // console.log(res);
    const res = await llm.call(injectedPrompt);
    return res;
};
