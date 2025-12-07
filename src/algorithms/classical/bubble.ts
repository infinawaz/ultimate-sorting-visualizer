import { SortStep } from '../../types';

export const bubbleSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Comparison step
            steps.push({
                array: [...arr],
                compared: [j, j + 1],
                swapped: null,
                merged: null,
                pivot: null,
            });

            if (arr[j] > arr[j + 1]) {
                // Swap step
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({
                    array: [...arr],
                    compared: [j, j + 1],
                    swapped: [j, j + 1],
                    merged: null,
                    pivot: null,
                });
            }
        }
    }

    // Final sorted state
    steps.push({
        array: [...arr],
        compared: null,
        swapped: null,
        merged: null,
        pivot: null,
    });

    return steps;
};
