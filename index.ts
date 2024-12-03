import { solutionDay1,solutionDay2 } from "@/solutions";

async function startSolution() {
    const d = new Date();
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate().toString();

    try {
       await solutionDay2();
    } catch (err) {
        console.error("Error occurred while getting solution:", err);
    }
}
startSolution();
