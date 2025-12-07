import type { SortStep } from '../../types';

export const selectionSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            // Comparison
            steps.push({
                array: [...arr],
                compared: [minIdx, j],
                swapped: null,
                merged: null,
                pivot: null,
            });

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        // Swap if needed
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            steps.push({
                array: [...arr],
                compared: [i, minIdx],
                swapped: [i, minIdx],
                merged: null,
                pivot: null,
            });
        } else {
            // Just mark as "processed" to show progress if we wanted, 
            // but for now we just show the array state
            steps.push({
                array: [...arr],
                compared: [i, i], // Highlight
                swapped: null,
                merged: null,
                pivot: null
            });
        }
    }

    // Final step
    steps.push({
        array: [...arr],
        compared: null,
        swapped: null,
        merged: null,
        pivot: null,
    });

    return steps;
};
