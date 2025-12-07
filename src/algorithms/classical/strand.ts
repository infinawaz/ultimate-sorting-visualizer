import type { SortStep } from '../../types';

export const strandSort = (array: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    let arr = [...array];
    if (arr.length === 0) return steps; // Or handle empty

    // Since strand sort works on lists, and we need to visualize 'arr',
    // we will treat the 'result' as the beginning of 'arr' conceptually,
    // but this is hard to visualize in-place.
    // We will simulate: 
    // 1. Identify a strand from the remaining unsorted part.
    // 2. Remove strand elements from unsorted.
    // 3. Merge strand into sorted part (new array).
    // 4. Update 'arr' to show: [sorted_part ... unsorted_remaining ... trash/blank?]

    // To keep it simple visually: 
    // We will maintain real lists, and reconstruct 'arr' at each major step for display.

    let list = [...arr];
    let sorted: number[] = [];

    while (list.length > 0) {
        let sublist = [list.shift()!];
        let leftover: number[] = [];

        // 1. Build strand
        for (let i = 0; i < list.length; i++) {
            // Visualization: Compare list[i] with last of sublist
            // We need to map this back to original positions or just reconstruct
            // Reconstructing is easier.
            const currentArrState = [...sorted, ...sublist, ...leftover, ...list.slice(i)];

            steps.push({
                array: currentArrState,
                compared: [sorted.length + sublist.length - 1, sorted.length + sublist.length + leftover.length],
                // Approximation of indices
                swapped: null,
                merged: null,
                pivot: null
            });

            if (list[i] >= sublist[sublist.length - 1]) {
                sublist.push(list[i]);
            } else {
                leftover.push(list[i]);
            }
        }
        list = leftover;

        // 2. Merge sublist into sorted
        if (sorted.length === 0) {
            sorted = [...sublist];
        } else {
            // Merge logic
            let temp: number[] = [];
            let i = 0;
            let j = 0;
            while (i < sorted.length && j < sublist.length) {
                steps.push({
                    array: [...sorted, ...sublist, ...list],
                    compared: [i, sorted.length + j],
                    swapped: null,
                    merged: null,
                    pivot: null
                });

                if (sorted[i] <= sublist[j]) {
                    temp.push(sorted[i]);
                    i++;
                } else {
                    temp.push(sublist[j]);
                    j++;
                }
            }
            while (i < sorted.length) temp.push(sorted[i++]);
            while (j < sublist.length) temp.push(sublist[j++]);
            sorted = temp;
        }

        // Update array
        steps.push({
            array: [...sorted, ...list],
            compared: null,
            swapped: null,
            merged: sorted.map((_, idx) => idx), // Highlight all sorted
            pivot: null
        });
    }

    // Final State
    steps.push({
        array: sorted,
        compared: null,
        swapped: null,
        merged: null,
        pivot: null
    });

    return steps;
};
