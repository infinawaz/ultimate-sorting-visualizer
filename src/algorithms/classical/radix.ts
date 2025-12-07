import type { SortStep } from '../../types';

export const radixSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    let arr = [...array];
    if (arr.length === 0) return steps;

    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        const output = new Array(arr.length).fill(0);
        const count = new Array(10).fill(0);

        // Count occurrences
        for (let i = 0; i < arr.length; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
            steps.push({
                array: [...arr],
                compared: [i, i], // Highlight scanning
                swapped: null,
                merged: null,
                pivot: null,
            });
        }

        // Accumulate
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Build output
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        // Update main array
        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [i],
                pivot: null,
            });
        }
    }

    return steps;
};
