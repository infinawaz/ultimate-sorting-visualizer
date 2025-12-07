import type { SortStep } from '../../types';

export const countingSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    if (arr.length === 0) return steps;

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length).fill(0);

    // Count frequencies
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
        // Highlight counting (no swap)
        steps.push({
            array: [...arr],
            compared: [i, i],
            swapped: null,
            merged: null,
            pivot: null,
            metadata: { count: [...count] },
        });
    }

    // Accumulate counts
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const val = arr[i];
        const pos = count[val - min] - 1;
        output[pos] = val;
        count[val - min]--;

        // Visualization: conceptually we are placing into a new array.
        // Since our visualizer only shows ONE array, we will cheat slightly
        // and show the 'arr' being visibly updated as if we copy 'output' back step-by-step
        // OR we just do the final copy. 
        // For better visualization, let's copy 'output' back to 'arr' incrementally usually,
        // but here we can't easily do that in-place without overwriting.
        // So we'll visualize the "read" from arr[i] and just show the final result at the end of pass?
        // A common trick is to just show the final copy.
    }

    // Copy output to arr for visualization
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        steps.push({
            array: [...arr],
            compared: null,
            swapped: null,
            merged: [i], // Highlight 'write'
            pivot: null,
        });
    }

    return steps;
};
