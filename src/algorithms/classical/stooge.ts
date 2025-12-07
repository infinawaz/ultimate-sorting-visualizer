import type { SortStep } from '../../types';

export const stoogeSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];

    const stooge = (l: number, h: number) => {
        if (l >= h) return;

        steps.push({
            array: [...arr],
            compared: [l, h],
            swapped: null,
            merged: null,
            pivot: null
        });

        if (arr[l] > arr[h]) {
            [arr[l], arr[h]] = [arr[h], arr[l]];
            steps.push({
                array: [...arr],
                compared: [l, h],
                swapped: [l, h],
                merged: null,
                pivot: null
            });
        }

        if (h - l + 1 > 2) {
            const t = Math.floor((h - l + 1) / 3);
            stooge(l, h - t);
            stooge(l + t, h);
            stooge(l, h - t);
        }
    };

    stooge(0, arr.length - 1);
    return steps;
};
