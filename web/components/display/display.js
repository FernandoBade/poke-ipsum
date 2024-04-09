import React from 'react';
import { ClipboardDocumentIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const Display = ({ dados }) => {
    return (
        <div className="drop-shadow-[0_25px_10px_rgba(0,0,0,0.55)] absolute left-[385px] top-0 text-sm text-cor-marrom bg-cor-offwhite bg-opacity-90 max-w-[480px] h-screen flex flex-col justify-between overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-cor-marrom">
                <span className="text-lg font-bold text-cor-marrom">Result:</span>
                <div className="p-2 bg-cor-amarelo rounded-md drop-shadow-md">
                    <ClipboardDocumentIcon className="h-6 w-6 text-cor-marrom" />
                </div>
            </div>

            {/* Body */}
            <div className="px-6 py-4 flex-1 overflow-y-auto">
                {dados.length > 0 ? (
                    dados.map((item, index) => (
                        <p key={index} className="my-2 text-justify">{item}</p>
                    ))
                ) : (
                    <div className="flex justify-center">
                        <ChevronLeftIcon className="h-4 w-4 text-cor-marrom" />
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-cor-amarelo text-center">
                <span className="text-xs">Generated on: {new Date().toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default Display;
