import type { SortStep } from '../../types';

export const bingoSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;

    let max = Math.max(...arr); // Initial max
    let nextMax = Math.min(...arr); // Will track next max

    // Ideally Bingo sort goes Max -> Min or Min -> Max?
    // Standard Bingo sort finds Max and moves to end (like Selection Sort).

    for (let i = n - 1; i >= 0;) {
        // 1. Find max in arr[0...i]
        // We already know 'max' from previous pass or init. 
        // But we need to find 'nextMax' (the largest value strictly less than current max)
        // actually we just simplify: repeated selection of MAX.

        let maxVal = -Infinity;
        for (let j = 0; j <= i; j++) {
            steps.push({
                array: [...arr],
                compared: [j, j],
                swapped: null,
                merged: null,
                pivot: null
            });
            if (arr[j] > maxVal) maxVal = arr[j];
        }

        // Move all instances of maxVal to end
        // We iterate backwards to swap effectively?
        // Or just iterate and swap to 'i' then decrement i.

        // Let's iterate from 0 to i
        let j = 0;
        while (j <= i) {
            if (arr[j] === maxVal) {
                [arr[j], arr[i]] = [arr[i], arr[j]];
                steps.push({
                    array: [...arr],
                    compared: null,
                    swapped: [j, i],
                    merged: null,
                    pivot: null
                });
                i--;
            } else {
                j++;
            }
        }
    }

    return steps;
};
