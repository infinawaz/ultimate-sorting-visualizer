import type { SortStep } from '../../types';

export const oddEvenMergeSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const n = array.length;

    // Find next power of 2
    let p = 1;
    while (p < n) p *= 2;

    // Pad with Infinity
    const paddedArray = [...array];
    for (let i = n; i < p; i++) {
        paddedArray.push(Infinity);
    }

    const arr = [...paddedArray];
    // Batcher's odd-even merge sort works on power of 2 virtually

    const recordStep = (compared: [number, number] | null, swapped: [number, number] | null) => {
        const visibleArray = arr.slice(0, n);
        let validCompared = null;
        if (compared && compared[0] < n && compared[1] < n) validCompared = compared;

        let validSwapped = null;
        if (swapped && swapped[0] < n && swapped[1] < n) validSwapped = swapped;

        if (validCompared || validSwapped) {
            steps.push({
                array: visibleArray,
                compared: validCompared,
                swapped: validSwapped,
                merged: null,
                pivot: null
            });
        }
    };

    const compareAndSwap = (i: number, j: number) => {
        // Record comparison
        recordStep([i, j], null);

        if (arr[i] > arr[j]) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            recordStep([i, j], [i, j]);
        }
    };

    const oddEvenMerge = (lo: number, n: number, r: number) => {
        let m = r * 2;
        if (m < n) {
            oddEvenMerge(lo, n, m);
            oddEvenMerge(lo + r, n, m);
            for (let i = lo + r; i + r < lo + n; i += m) {
                compareAndSwap(i, i + r);
            }
        } else {
            compareAndSwap(lo, lo + r);
        }
    };

    const sort = (lo: number, n: number) => {
        if (n > 1) {
            let m = Math.floor(n / 2);
            sort(lo, m);
            sort(lo + m, m);
            oddEvenMerge(lo, n, 1);
        }
    };

    // Note: Only works strictly for power of 2 arrays. 
    // We should pad or handle, but for this visualizer we will try to just run it 
    // typically on the available array size. If not power of 2, it might fail to sort completely 
    // or index out of bounds if not careful.
    // Standard implementation is recursive.

    // Robust implementation for non-power-of-2 is complex.
    // We will restrict or pad? No, let's use a simpler Iterative version or assume Power of 2 mostly 
    // or just implement best effort.
    // Actually, Batcher's is stricter.
    // Let's implement simpler "Parallel Merge" which is just Merge Sort but we try to visualize layers?
    // No, let's stick to Odd-Even Merge and note it might require 2^k.

    // Power of 2 check usually?
    // Let's try to fit largest power of 2 less than N?
    // Or just run it on the whole array effectively padding logic?
    // Let's trust standard recursion handles sub-parts.

    sort(0, p);

    // Final step
    steps.push({
        array: arr.slice(0, n),
        compared: null,
        swapped: null,
        merged: null,
        pivot: null
    });

    return steps;
};
