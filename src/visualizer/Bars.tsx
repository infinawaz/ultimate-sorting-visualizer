import React from 'react';

type BarsProps = {
    array: number[];
    compared: [number, number] | null;
    swapped: [number, number] | null;
    merged: number[] | null;
    pivot: number | null;
};

const Bars: React.FC<BarsProps> = ({ array, compared, swapped, merged, pivot }) => {
    const getBarStyle = (index: number, value: number) => {
        let bgColor = 'bg-indigo-500'; // Default

        if (compared && (compared[0] === index || compared[1] === index)) {
            bgColor = 'bg-yellow-400';
        }
        if (swapped && (swapped[0] === index || swapped[1] === index)) {
            bgColor = 'bg-red-500';
        }
        if (pivot === index) {
            bgColor = 'bg-green-500';
        }
        if (merged && merged.includes(index)) {
            bgColor = 'bg-purple-500';
        }

        // Dynamic height based on value (assuming sorting 1-100 or relative)
        const height = `${Math.max(5, (value / Math.max(...array)) * 85)}%`;

        return { height, bgColor };
    };

    return (
        <div className="flex items-end justify-center w-full h-[60vh] bg-gray-900 p-4 rounded-lg shadow-2xl overflow-hidden gap-1">
            {array.map((value, idx) => {
                const { height, bgColor } = getBarStyle(idx, value);
                return (
                    <div key={idx} className="flex flex-col justify-end items-center w-full h-full gap-1">
                        <div
                            className={`w-full transition-all duration-75 ease-in-out ${bgColor} rounded-t-sm`}
                            style={{ height }}
                            title={`Value: ${value}`}
                        ></div>
                        <span className="text-[10px] text-gray-300 font-mono select-none">
                            {value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default Bars;
