import type { SortStep } from '../../types';

export const cycleSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
        let item = arr[cycleStart];
        let pos = cycleStart;

        // Find position where we put the item
        for (let i = cycleStart + 1; i < n; i++) {
            steps.push({
                array: [...arr],
                compared: [i, cycleStart],
                swapped: null,
                merged: null,
                pivot: null
            });
            if (arr[i] < item) {
                pos++;
            }
        }

        if (pos === cycleStart) {
            continue;
        }

        // Skip duplicates
        while (item === arr[pos]) {
            pos++;
        }

        if (pos !== cycleStart) {
            let temp = item;
            item = arr[pos];
            arr[pos] = temp;
            steps.push({
                array: [...arr],
                compared: null,
                swapped: [pos, pos], // Write
                merged: null,
                pivot: null
            });
        }

        // Rotate rest of the cycle
        while (pos !== cycleStart) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < n; i++) {
                steps.push({
                    array: [...arr],
                    compared: [i, cycleStart],
                    swapped: null,
                    merged: null,
                    pivot: null
                });
                if (arr[i] < item) {
                    pos++;
                }
            }

            while (item === arr[pos]) {
                pos++;
            }

            if (item !== arr[pos]) {
                let temp = item;
                item = arr[pos];
                arr[pos] = temp;
                steps.push({
                    array: [...arr],
                    compared: null,
                    swapped: [pos, pos],
                    merged: null,
                    pivot: null
                });
            }
        }
    }

    return steps;
};
