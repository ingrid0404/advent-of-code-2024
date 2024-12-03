import { readProblemDataByDay } from "../utils/fileInput";

export async function solutionDay3(): Promise<void> {
    try {
        const inputData = await readProblemDataByDay("03");
        if (inputData) {
            partOne(inputData);
        }
    } catch (err) {
        console.log(err);
    }
}

function partOne(inputData: string): void {
    let regex = /(?:mul)[(]+\d{1,3},\d{1,3}[)]/g;
    let splitedData = inputData.match(regex);
    if (splitedData) {
        let memory = 0;
        regex = /\d{1,3},\d{1,3}/g;
        for (let index = 0; index < splitedData?.length; index++) {
            let onlyNumbers = splitedData[index].match(regex)?.[0];
            let mul = onlyNumbers?.split(",");
            if (mul && mul[0] && mul[1]) {
                memory += parseInt(mul[0]) * parseInt(mul[1]);
            }
        }
        console.log('Memory: ' + memory)
    }
}
