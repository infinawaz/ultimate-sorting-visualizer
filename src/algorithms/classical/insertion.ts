import type { SortStep } from '../../types';

export const insertionSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Highlight key selection
        steps.push({
            array: [...arr],
            compared: [i, i],
            swapped: null,
            merged: null,
            pivot: null,
        });

        while (j >= 0 && arr[j] > key) {
            // Comparison
            steps.push({
                array: [...arr],
                compared: [j, j + 1],
                swapped: null,
                merged: null,
                pivot: null,
            });

            // Shift
            arr[j + 1] = arr[j];
            steps.push({
                array: [...arr],
                compared: [j, j + 1],
                swapped: [j, j + 1], // Visualizing shift as a kind of swap/overwrite
                merged: null,
                pivot: null,
            });

            j = j - 1;
        }
        arr[j + 1] = key;

        // Placement
        steps.push({
            array: [...arr],
            compared: null,
            swapped: [j + 1, j + 1], // Highlight placement
            merged: null,
            pivot: null,
        });
    }

    return steps;
};
