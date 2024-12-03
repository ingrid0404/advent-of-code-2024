import { solutionDay1 } from "@/solutions";

async function startSolution() {
    const d = new Date();
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate().toString();

    try {
       await solutionDay1();
    } catch (err) {
        console.error("Error occurred while getting solution:", err);
    }
}
startSolution();
