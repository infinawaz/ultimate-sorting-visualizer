// @ts-nocheck
import { ALGORITHMS } from '../algorithms/registry';

const runTests = () => {
    const failures: string[] = [];

    Object.entries(ALGORITHMS).forEach(([name, algoFunc]) => {
        try {
            console.log(`Testing ${name}...`);
            const arr = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));
            const initialArr = [...arr];
            const steps = algoFunc([...arr]);

            if (steps.length === 0) {
                if (arr.length > 0) {
                    console.error(`FAILURE: ${name} returned 0 steps.`);
                    failures.push(name);
                }
                return;
            }

            const lastStep = steps[steps.length - 1];
            const sortedArr = lastStep.array;

            const expected = [...arr].sort((a, b) => a - b);

            const isSorted = JSON.stringify(sortedArr) === JSON.stringify(expected);

            if (!isSorted) {
                console.error(`FAILURE: ${name} did not sort correctly.`);
                console.error(`Expected: ${expected.slice(0, 10)}...`);
                console.error(`Got:      ${sortedArr.slice(0, 10)}...`);
                failures.push(name);
            }

        } catch (e) {
            console.error(`ERROR: ${name} threw exception:`, e);
            failures.push(name);
        }
    });

    if (failures.length > 0) {
        console.log("\nFAILED ALGORITHMS:");
        failures.forEach(f => console.log(`- ${f}`));
        process.exit(1);
    } else {
        console.log("\nALL ALGORITHMS PASSED!");
    }
};

runTests();
