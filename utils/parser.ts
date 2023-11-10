import xlsx from "json-as-xlsx";

const sheetHeaders = [
    "SerialNo",
    "SectionName",
    "Tag",
    "PositiveMark",
    "NegativeMark",
    "Level",
    "AnswerTime",
    "Instruction",
    "AnswerExplanation",
    "Question",
    "QuestionType",
    "CorrectOption",
    "Option1",
    "Option2",
    "Option3",
    "Option4",
    "Option5",
    "Criteria1",
    "Percentage1",
    "Criteria2",
    "Percentage2",
    "Criteria3",
    "Percentage3",
    "Criteria4",
    "Percentage4",
    "Criteria5",
    "Percentage5",
];

const randomValue = () => Math.floor(Math.random() * 100);

const mockData = Array.from({ length: 5 }, (_, i) => ({
    SerialNo: i + 1,
    SectionName: `Section ${i + 1}`,
    Tag: `Tag ${i + 1}`,
    PositiveMark: randomValue(),
    NegativeMark: randomValue(),
    Level: randomValue(),
    AnswerTime: randomValue(),
    Instruction: `Instruction ${i + 1}`,
    AnswerExplanation: `Answer Explanation ${i + 1}`,
    Question: `Question ${i + 1}`,
    QuestionType: `Question Type ${i + 1}`,
    CorrectOption: `Correct Option ${i + 1}`,
    Option1: `Option 1 ${i + 1}`,
    Option2: `Option 2 ${i + 1}`,
    Option3: `Option 3 ${i + 1}`,
    Option4: `Option 4 ${i + 1}`,
    Option5: `Option 5 ${i + 1}`,
    Criteria1: `Criteria 1 ${i + 1}`,
    Percentage1: randomValue(),
    Criteria2: `Criteria 2 ${i + 1}`,
    Percentage2: randomValue(),
    Criteria3: `Criteria 3 ${i + 1}`,
    Percentage3: randomValue(),
    Criteria4: `Criteria 4 ${i + 1}`,
    Percentage4: randomValue(),
    Criteria5: `Criteria 5 ${i + 1}`,
    Percentage5: randomValue(),
}));

// console.log(data);

const getSheets = (fileName: string, questions: any) => {
    const sheets = [
        {
            sheet: fileName,
            columns: sheetHeaders.map((headerTerm) => {
                return {
                    label: headerTerm,
                    value: (row: any) =>
                        row[headerTerm] ? row[headerTerm] : "",
                };
            }),
            content: questions,
        },
    ];

    return sheets;
};

export const parseXLSX = (fileName: string, questions: any) => {
    const settings = {
        fileName: fileName,
        extraLength: 4,
        writeMode: "writeFile",
        writeOptions: {},
    };

    console.log(getSheets(fileName.slice(20), questions));
    xlsx(getSheets(fileName.slice(20), questions), settings);
};
