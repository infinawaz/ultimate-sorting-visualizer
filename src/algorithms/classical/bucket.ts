import type { SortStep } from '../../types';

export const bucketSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    let arr = [...array];
    if (arr.length === 0) return steps;

    const n = arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    // Use n buckets roughly
    const bucketCount = Math.floor(Math.sqrt(n)) || 5;
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
    const range = (max - min) / bucketCount;

    // Distribute
    for (let i = 0; i < n; i++) {
        const val = arr[i];
        let bucketIdx = Math.floor((val - min) / range);
        if (bucketIdx === bucketCount) bucketIdx--; // Handle max value

        buckets[bucketIdx].push(val);

        // Visualize placing into bucket (conceptually just highlight)
        steps.push({
            array: [...arr],
            compared: [i, i],
            swapped: null,
            merged: null,
            pivot: null,
            metadata: { bucket: bucketIdx }
        });
    }

    // Sort and gather
    let k = 0;
    for (let i = 0; i < bucketCount; i++) {
        // Sort bucket using simple insertion logic for visualization
        // We will extract bucket to temp array, sort it, and put it back in the main array
        // Real bucket sort is different but for visualization we simulate sorting the "slice"
        // Since we don't track indices easily in buckets, we will just reconstruct the array

        // Simplification: We blindly reconstruct the array as we go for visualization?
        // Actually, let's just sort the internal bucket then overwrite the main array section
        buckets[i].sort((a, b) => a - b);

        for (let j = 0; j < buckets[i].length; j++) {
            arr[k] = buckets[i][j];
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k], // Show it appearing in sorted order
                pivot: null
            });
            k++;
        }
    }

    return steps;
};
