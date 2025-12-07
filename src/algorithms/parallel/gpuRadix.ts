import type { SortStep } from '../../types';

export const gpuRadixSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    let arr = [...array];
    if (arr.length === 0) return steps;

    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        // GPU style: Parallel Histogram
        // We simulate "threads" counting chunks of the array
        const numThreads = 4;
        const chunkSize = Math.ceil(arr.length / numThreads);

        let localHistograms: number[][] = Array.from({ length: numThreads }, () => Array(10).fill(0));

        // Parallel Count
        for (let t = 0; t < numThreads; t++) {
            const start = t * chunkSize;
            const end = Math.min(start + chunkSize, arr.length);
            for (let i = start; i < end; i++) {
                const digit = Math.floor(arr[i] / exp) % 10;
                localHistograms[t][digit]++;
                steps.push({
                    array: [...arr],
                    compared: [i, i],
                    swapped: null,
                    merged: null,
                    pivot: null,
                    metadata: { thread: t, bucket: digit }
                });
            }
        }

        // Prefix Sum (Scan) - very fast on GPU
        let totalCount = new Array(10).fill(0);
        for (let i = 0; i < 10; i++) {
            for (let t = 0; t < numThreads; t++) {
                totalCount[i] += localHistograms[t][i];
            }
        }

        for (let i = 1; i < 10; i++) totalCount[i] += totalCount[i - 1];

        // Reorder
        const output = new Array(arr.length).fill(0);
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[totalCount[digit] - 1] = arr[i];
            totalCount[digit]--;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i] = output[i];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [i],
                pivot: null,
                metadata: { algo: "GPU Scatter" }
            });
        }
    }

    return steps;
};
