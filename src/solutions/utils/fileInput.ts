import fs from "node:fs/promises";

export async function readProblemDataByDay(
    day: string | number,
): Promise<string | undefined> {
    let data;
    try {
        data = await fs.readFile(`src/solutions/${day}/input`, {
            encoding: "utf8",
        });
    } catch (err) {
        console.log(err);
    }
    return data;
}
