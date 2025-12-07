import type { SortStep } from '../../types';

export const bitonicSort = (array: number[]): SortStep[] => {
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

    const arr = [...paddedArray]; // Work on padded array

    const recordStep = (compared: [number, number] | null, swapped: [number, number] | null) => {
        // Filter out steps involving padding
        const visibleArray = arr.slice(0, n);

        // If sorting worked correctly, padding (Infinity) should end up at the end.
        // We only show steps where both indices are within original bounds.
        let validCompared = null;
        if (compared && compared[0] < n && compared[1] < n) {
            validCompared = compared;
        }

        let validSwapped = null;
        if (swapped && swapped[0] < n && swapped[1] < n) {
            validSwapped = swapped;
        }

        // Only push if something visible happened or it's a significant step?
        // Actually, strictly pushing state is safer.
        // But we want to avoid "empty" comparisons of invisible elements effectively freezing the UI.
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

    const bitonicMerge = (low: number, cnt: number, dir: boolean) => {
        if (cnt > 1) {
            const k = Math.floor(cnt / 2);
            for (let i = low; i < low + k; i++) {
                // Record comparison
                recordStep([i, i + k], null);

                const replace = dir ? (arr[i] > arr[i + k]) : (arr[i] < arr[i + k]);
                if (replace) {
                    [arr[i], arr[i + k]] = [arr[i + k], arr[i]];
                    recordStep([i, i + k], [i, i + k]);
                }
            }
            bitonicMerge(low, k, dir);
            bitonicMerge(low + k, k, dir);
        }
    };

    const bitonicSortRec = (low: number, cnt: number, dir: boolean) => {
        if (cnt > 1) {
            const k = Math.floor(cnt / 2);
            bitonicSortRec(low, k, !dir);
            bitonicSortRec(low + k, k, dir);
            bitonicMerge(low, cnt, dir);
        }
    };

    bitonicSortRec(0, p, true); // true = ascending

    // Final state
    steps.push({
        array: arr.slice(0, n),
        compared: null,
        swapped: null,
        merged: null,
        pivot: null
    });

    return steps;
};
