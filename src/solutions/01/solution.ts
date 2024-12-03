import { readProblemDataByDay } from "../utils/fileInput";

export async function solutionDay1(): Promise<number> {
    let solution = -1;
    try {
        const inputData = await readProblemDataByDay("01");
        if (inputData) {
            let leftArray: number[] = [],
                rightArray: number[] = [];
            let splited = inputData.split(/\r?\n/);
            for (let input of splited) {
                let [parsedLeft, parsedRight] = input.split(/\s+/);
                if (parsedLeft && parsedRight) {
                    leftArray.push(parseInt(parsedLeft));
                    rightArray.push(parseInt(parsedRight));
                }
            }

            const descendingSort = (a: number, b: number) => b - a;
            leftArray.sort(descendingSort);
            rightArray.sort(descendingSort);

            let length = rightArray.length;

            let totalDistance = 0;
            for (let index = 0; index < length; index++) {
                let diff = Math.abs(leftArray[index] - rightArray[index]);
                totalDistance += diff;
            }
            return totalDistance;
        }
    } catch (err) {
        console.log(err);
    }

    return solution;
}
