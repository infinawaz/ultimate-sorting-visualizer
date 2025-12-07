import React from 'react';
import { ComplexityInfo } from '../types';

interface ComplexityPanelProps {
    info: ComplexityInfo | undefined;
}

export const ComplexityPanel: React.FC<ComplexityPanelProps> = ({ info }) => {
    if (!info) {
        return (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
                <h2 className="text-xl font-bold mb-4">Algorithm Details</h2>
                <p className="text-gray-400 italic">Select an algorithm to see details.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white h-full border border-gray-700">
            <h2 className="text-2xl font-bold mb-2 text-indigo-400">{info.name}</h2>
            <div className="mb-4">
                <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide
          ${info.category === 'comparison' ? 'bg-blue-600' :
                        info.category === 'non-comparison' ? 'bg-green-600' :
                            info.category === 'hybrid' ? 'bg-purple-600' : 'bg-pink-600'
                    }`}
                >
                    {info.category}
                </span>
            </div>

            <p className="text-gray-300 mb-6 text-sm leading-relaxed border-l-4 border-indigo-500 pl-4">
                {info.notes}
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-700 p-3 rounded">
                    <p className="text-gray-400 text-xs uppercase mb-1">Best Case</p>
                    <p className="font-mono font-bold text-green-400">{info.bestTime}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                    <p className="text-gray-400 text-xs uppercase mb-1">Average Case</p>
                    <p className="font-mono font-bold text-yellow-400">{info.avgTime}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                    <p className="text-gray-400 text-xs uppercase mb-1">Worst Case</p>
                    <p className="font-mono font-bold text-red-400">{info.worstTime}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                    <p className="text-gray-400 text-xs uppercase mb-1">Space Complexity</p>
                    <p className="font-mono font-bold text-blue-300">{info.space}</p>
                </div>
            </div>

            <div className="mt-6 border-t border-gray-700 pt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className={`p-2 rounded ${info.stable ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                    {info.stable ? 'Stable' : 'Unstable'}
                </div>
                <div className={`p-2 rounded ${info.inPlace ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                    {info.inPlace ? 'In-Place' : 'Out-of-Place'}
                </div>
                <div className={`p-2 rounded ${info.adaptive ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                    {info.adaptive ? 'Adaptive' : 'Non-Adaptive'}
                </div>
            </div>
        </div>
    );
};
