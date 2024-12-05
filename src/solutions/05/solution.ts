import { readProblemDataByDay } from "../utils/fileInput";

export async function solutionDay5(): Promise<void> {
    try {
        const inputData = await readProblemDataByDay("05");
        if (inputData) {
            partOne(inputData);
        }
    } catch (err) {
        console.log(err);
    }
}

function getMiddleSumFromValidatedList(
    lists: number[][],
    adiacentGraph: Map<number, number[]>,
): number {
    let middleSum = 0;

    for (let list of lists) {
        middleSum += validateList(list, adiacentGraph);
    }

    return middleSum;
}
function validateList(
    list: number[],
    adiacentGraph: Map<number, number[]>,
): number {
    let i, j;

    let n = list.length;
    let middleIndex = Math.round(n / 2 - 1);
    let middle = list[middleIndex];

    for (i = 0; i < n; i++) {
        let ordering = adiacentGraph.get(list[i]);

        for (j = i + 1; j < n; j++) {
            if (!ordering?.includes(list[j])) {
                return 0;
            }
        }
        if (i === n - 1) {
            let sublist = list.slice(0, n - 1);
            let value = sublist.some((s) => ordering?.includes(s));
            if (value) {
                return 0;
            }
        }
    }

    return middle;
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

    const response = getMiddleSumFromValidatedList(lists, adiacentGraph);

    console.log(response);
}

