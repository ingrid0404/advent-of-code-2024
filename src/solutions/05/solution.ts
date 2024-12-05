import { readProblemDataByDay } from "../utils/fileInput";

export async function solutionDay5(): Promise<void> {
    try {
        const inputData = await readProblemDataByDay("05");
        if (inputData) {
            partOne(inputData);
            partTwo(inputData);
        }
    } catch (err) {
        console.log(err);
    }
}

function shuffleArray(arr: number[]): number[] {
    let sorted = arr.slice();
    return sorted.sort(function (a, b) {
        return Math.random() - 0.5;
    });
}

function tryToValidateList(
    list: number[],
    adiacentGraph: Map<number, number[]>,
): number {
    let n = list.length;
    let middleIndex = Math.round(n / 2 - 1);

    let isValid = false;
    let sorted: number[] = [];
    do {
        sorted = shuffleArray(list);
        isValid = checkIfListIsValidUntilIndex(
            sorted,
            adiacentGraph,
            middleIndex + 1,
        );
    } while (isValid);

    
    return sorted[middleIndex];
}

function getMiddleSumFromInvalidLists(
    lists: number[][],
    adiacentGraph: Map<number, number[]>,
): number {
    let middleSum = 0;

    for (let list of lists) {
        if (!checkIfListIsValidUntilIndex(list, adiacentGraph)) {
            let middleIndex = Math.round(list.length / 2 - 1);
            if (
                checkIfListIsValidUntilIndex(
                    list,
                    adiacentGraph,
                    middleIndex + 1,
                )
            ) {
                middleSum += list[middleIndex];
            } else {
                //try to validate list
                middleSum += tryToValidateList(list, adiacentGraph);
            }
        }
    }

    return middleSum;
}
function getMiddleSumFromValidatedLists(
    lists: number[][],
    adiacentGraph: Map<number, number[]>,
): number {
    let middleSum = 0;

    for (let list of lists) {
        middleSum += validateList(list, adiacentGraph);
    }

    return middleSum;
}

function checkIfListIsValidUntilIndex(
    list: number[],
    adiacentGraph: Map<number, number[]>,
    index?: number,
): boolean {
    let i, j;
    let n = !index || index > list.length ? list.length : index;
    for (i = 0; i < n; i++) {
        let ordering = adiacentGraph.get(list[i]);

        for (j = i + 1; j < n; j++) {
            if (!ordering?.includes(list[j])) {
                return false;
            }
        }
        if (i === n - 1) {
            let sublist = list.slice(0, n - 1);
            let value = sublist.some((s) => ordering?.includes(s));
            if (value) {
                return false;
            }
        }
    }

    return true;
}
function validateList(
    list: number[],
    adiacentGraph: Map<number, number[]>,
): number {
    let n = list.length;
    let middleIndex = Math.round(n / 2 - 1);
    let middle = list[middleIndex];

    let isValid = checkIfListIsValidUntilIndex(list, adiacentGraph);

    return isValid ? middle : 0;
}
function buildLists(dataSet: string[]): number[][] {
    let lists: number[][] = [];
    for (let line of dataSet) {
        let splitedLine = line.split(",").map((x) => parseInt(x));
        lists.push(splitedLine);
    }
    return lists;
}
function buildAdiancentGraph(dataSet: string[]): Map<number, number[]> {
    let graph = new Map<number, number[]>();
    for (let data of dataSet) {
        let info = data.split("|");
        let key = parseInt(info[0]);
        let value = parseInt(info[1]);
        if (graph.has(key)) {
            let currentValue = graph.get(key);
            if (currentValue) {
                let newValue = [...currentValue, value];
                newValue = newValue.sort();
                graph.set(key, newValue);
            } else {
                graph.set(key, [value]);
            }
        } else {
            graph.set(key, [value]);
        }
    }

    return graph;
}

function partOne(inputData: string): void {
    let dataSet = inputData.split(/\r\n\s*\n/);
    const pageOrderingRules = dataSet[0];
    const pagesToProduceInEachUpdate = dataSet[1];

    let adiacentGraph = buildAdiancentGraph(pageOrderingRules.split(/\r?\n/));
    let lists = buildLists(pagesToProduceInEachUpdate.split(/\r?\n/));

    const response = getMiddleSumFromValidatedLists(lists, adiacentGraph);

    console.log(response);
}

function partTwo(inputData: string): void {
    let dataSet = inputData.split(/\r\n\s*\n/);
    const pageOrderingRules = dataSet[0];
    const pagesToProduceInEachUpdate = dataSet[1];

    let adiacentGraph = buildAdiancentGraph(pageOrderingRules.split(/\r?\n/));
    let lists = buildLists(pagesToProduceInEachUpdate.split(/\r?\n/));

    const response = getMiddleSumFromInvalidLists(lists, adiacentGraph);
    console.log(response);
}
