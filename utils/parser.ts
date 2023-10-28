import xlsx from "json-as-xlsx";

let tempDataForBuild = [
    {
        sheet: "Adults",
        columns: [
            { label: "User", value: (row: any) => row.user },
            { label: "Age", value: (row: any) => row.age + " years" },
            {
                label: "Phone",
                value: (row: any) => (row.more ? row.more.phone || "" : ""),
            },
        ],
        content: [
            { user: "Andrea", age: 20, more: { phone: "11111111" } },
            { user: "Luis", age: 21, more: { phone: "12345678" } },
        ],
    },
];

export const parseXLSX = (fileName: string) => {
    const settings = {
        fileName: fileName,
        extraLength: 4,
        writeMode: "writeFile",
        writeOptions: {},
    };
    xlsx(tempDataForBuild, settings);
};
