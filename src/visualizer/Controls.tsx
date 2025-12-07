import React from 'react';
import { COMPLEXITIES } from '../data/complexities';

type ControlsProps = {
    algorithm: string;
    setAlgorithm: (algo: string) => void;
    speed: number;
    setSpeed: (speed: number) => void;
    arraySize: number;
    setArraySize: (size: number) => void;
    generateNewArray: () => void;
    isPlaying: boolean;
    togglePlay: () => void;
    reset: () => void;
};

const Controls: React.FC<ControlsProps> = ({
    algorithm,
    setAlgorithm,
    speed,
    setSpeed,
    arraySize,
    setArraySize,
    generateNewArray,
    isPlaying,
    togglePlay,
    reset,
}) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Algorithm</label>
                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    disabled={isPlaying}
                    className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:border-indigo-500"
                >
                    {Object.entries(COMPLEXITIES).length === 0 ? (
                        <option value="">No Algorithms Loaded</option>
                    ) : (
                        Object.entries(COMPLEXITIES).map(([key, info]) => (
                            <option key={key} value={key}>{info.name}</option>
                        ))
                    )}
                </select>
            </div>

            <div className="flex flex-col gap-2 w-32">
                <label className="text-xs font-bold text-gray-400 uppercase">Speed ({speed}ms)</label>
                <input
                    type="range"
                    min="1"
                    max="500"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    disabled={isPlaying}
                    className="accent-indigo-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="flex flex-col gap-2 w-32">
                <label className="text-xs font-bold text-gray-400 uppercase">Size ({arraySize})</label>
                <input
                    type="range"
                    min="5"
                    max="100"
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={isPlaying}
                    className="accent-indigo-500 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="flex gap-4 mt-4 sm:mt-0">
                <button
                    onClick={generateNewArray}
                    disabled={isPlaying}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-semibold transition-colors disabled:opacity-50"
                >
                    New Array
                </button>
                <button
                    onClick={togglePlay}
                    className={`px-6 py-2 rounded font-bold text-white transition-colors ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'
                        }`}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                    onClick={reset}
                    disabled={isPlaying}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-semibold transition-colors disabled:opacity-50"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Controls;
