import { solutionDay1 } from "@/solutions";

async function startSolution() {
    const d = new Date();
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

    let solution = await solutionDay1();
    console.log('Solution: ' + solution)
}

startSolution();
