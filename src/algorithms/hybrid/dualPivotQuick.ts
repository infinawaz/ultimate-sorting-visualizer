import type { SortStep } from '../../types';

export const dualPivotQuickSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arr = [...array];

    const dualPivot = (low: number, high: number) => {
        if (low < high) {
            // Pivot selection
            if (arr[low] > arr[high]) {
                [arr[low], arr[high]] = [arr[high], arr[low]];
                steps.push({
                    array: [...arr],
                    compared: [low, high],
                    swapped: [low, high],
                    merged: null,
                    pivot: null
                });
            }

            let p1 = arr[low];
            let p2 = arr[high];

            steps.push({
                array: [...arr],
                compared: null,
                swapped: null,
                merged: null,
                pivot: low // We can't easily visualize two pivots with current types, will imply
            });

            let i = low + 1;
            let k = low + 1;
            let j = high - 1;

            while (k <= j) {
                steps.push({
                    array: [...arr],
                    compared: [k, low], // Validating against p1/p2
                    swapped: null,
                    merged: null,
                    pivot: null
                });

                if (arr[k] < p1) {
                    [arr[k], arr[i]] = [arr[i], arr[k]];
                    steps.push({
                        array: [...arr],
                        compared: null,
                        swapped: [k, i],
                        merged: null,
                        pivot: null
                    });
                    i++;
                    k++;
                } else if (arr[k] > p2) {
                    steps.push({
                        array: [...arr],
                        compared: [k, high],
                        swapped: null,
                        merged: null,
                        pivot: null
                    });
                    while (arr[j] > p2 && k < j) {
                        j--;
                    }
                    [arr[k], arr[j]] = [arr[j], arr[k]];
                    steps.push({
                        array: [...arr],
                        compared: null,
                        swapped: [k, j],
                        merged: null,
                        pivot: null
                    });
                    j--;

                    if (arr[k] < p1) {
                        [arr[k], arr[i]] = [arr[i], arr[k]];
                        steps.push({
                            array: [...arr],
                            compared: null,
                            swapped: [k, i],
                            merged: null,
                            pivot: null
                        });
                        i++;
                    }
                    k++;
                } else {
                    k++;
                }
            }
            i--; j++;
            [arr[low], arr[i]] = [arr[i], arr[low]];
            [arr[high], arr[j]] = [arr[j], arr[high]];

            steps.push({
                array: [...arr],
                compared: null,
                swapped: [low, i],
                merged: null,
                pivot: i
            });
            steps.push({
                array: [...arr],
                compared: null,
                swapped: [high, j],
                merged: null,
                pivot: j
            });

            dualPivot(low, i - 1);
            dualPivot(i + 1, j - 1);
            dualPivot(j + 1, high);
        }
    };

    dualPivot(0, arr.length - 1);
    return steps;
};
