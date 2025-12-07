import type { SortStep } from '../../types';

export const adaptiveRadixSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    let arr = [...array]; // We will update this in place properly

    const getMax = (a: number[], l: number, r: number) => {
        let m = a[l];
        for (let i = l + 1; i <= r; i++) if (a[i] > m) m = a[i];
        return m;
    };

    const msdSort = (l: number, r: number, exp: number) => {
        if (l >= r || exp <= 0) return;

        // Bucket logic for binary/decimal radix? 
        // Let's use decimal for consistency with other radix sort
        // But we need to find max in THIS range to know 'exp' is valid
        // Actually MSD works by digit position.

        // Let's use simple bucket distribution for the digit at 'exp'
        // 10 buckets
        const buckets: number[][] = Array.from({ length: 10 }, () => []);

        for (let i = l; i <= r; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            buckets[digit].push(arr[i]);
            steps.push({
                array: [...arr],
                compared: [i, i],
                swapped: null,
                merged: null,
                pivot: null,
                metadata: { bucket: digit }
            });
        }

        // Reconstruct into arr
        let k = l;
        let boundaries: number[] = []; // Track start indices for recursive calls

        for (let i = 0; i < 10; i++) {
            boundaries[i] = k;
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
        boundaries[10] = k; // End

        // Recurse for next digit on each bucket
        // exp / 10
        if (exp > 1) {
            for (let i = 0; i < 10; i++) {
                if (buckets[i].length > 1) {
                    msdSort(boundaries[i], boundaries[i + 1] - 1, Math.floor(exp / 10));
                }
            }
        }
    };

    if (arr.length > 0) {
        let m = Math.max(...arr);
        let exp = 1;
        while (Math.floor(m / 10) > 0) {
            m = Math.floor(m / 10);
            exp *= 10;
        }
        msdSort(0, arr.length - 1, exp);
    }

    return steps;
};
