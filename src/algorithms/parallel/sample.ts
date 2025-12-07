import type { SortStep } from '../../types';

export const sampleSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    let arr = [...array];
    const n = arr.length;
    if (n === 0) return steps;

    const p = Math.floor(Math.sqrt(n)); // Number of buckets approx
    const sampleSize = p * (Math.log(n) > 1 ? Math.floor(Math.log(n)) : 2);
    // Oversampling

    // 1. Sample
    let sample: number[] = [];
    for (let i = 0; i < sampleSize && i < n; i++) {
        sample.push(arr[Math.floor(Math.random() * n)]);
    }
    sample.sort((a, b) => a - b);

    // Select splitters
    let splitters: number[] = [];
    // We need p-1 splitters
    for (let i = 1; i < p; i++) {
        // Approximate position in sorted sample
        let idx = Math.floor(i * sample.length / p);
        if (idx < sample.length) splitters.push(sample[idx]);
    }
    splitters.push(Infinity); // Sentinel

    // 2. Distribute to buckets
    let buckets: number[][] = Array.from({ length: p }, () => []);
    for (let i = 0; i < n; i++) {
        let b = 0;
        while (b < splitters.length - 1 && arr[i] > splitters[b]) {
            b++;
        }
        buckets[b].push(arr[i]);
        steps.push({
            array: [...arr],
            compared: [i, i],
            swapped: null,
            merged: null,
            pivot: null,
            metadata: { bucket: b }
        });
    }

    // 3. Sort buckets (using simple sort for visualization)
    let k = 0;
    for (let i = 0; i < p; i++) {
        buckets[i].sort((a, b) => a - b);
        for (let val of buckets[i]) {
            arr[k] = val;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: [k],
                pivot: null
            });
            k++;
        }
    }

    return steps;
};
