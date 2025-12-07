export type SortStep = {
    array: number[];
    compared: [number, number] | null;
    swapped: [number, number] | null;
    merged: number[] | null;
    pivot: number | null;
    metadata?: Record<string, any>;
};

export type ComplexityInfo = {
    name: string;
    category: "comparison" | "non-comparison" | "hybrid" | "parallel";
    bestTime: string;
    avgTime: string;
    worstTime: string;
    space: string;
    stable: boolean;
    inPlace: boolean;
    adaptive: boolean;
    notes: string;
};
