import { solutionDay1 } from "@/solutions";

async function startSolution() {
    const d = new Date();
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate().toString();  // Ensure day is a string

    try {
        const solution = await solutionDay1();
        console.log('Solution: ' + solution);
    } catch (err) {
        console.error("Error occurred while getting solution:", err);
    }
}
startSolution();
