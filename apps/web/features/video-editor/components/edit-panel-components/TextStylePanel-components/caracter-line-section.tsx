"use client"

import { useState } from "react";

export default function CharacterLineSection() {
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [lineHeight, setLineHeight] = useState(0);

    function handleLetterSpacing(number: number) {
        setLetterSpacing(letterSpacing + number)
    }
    function handleLineHeight(number: number) {
        setLineHeight(lineHeight + number)
    }
    return (
        <div className="flex max-w-xs items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
                <label className="text-sm ">Caractère</label>
                <div className="flex items-center bg-muted rounded px-2 h-8 w-20 justify-between">
                    <input
                        type="number"
                        value={letterSpacing}
                        onChange={(e) => setLetterSpacing(Number(e.target.value))}
                        className="bg-transparent text-foreground text-sm w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex flex-col text-[8px] text-muted-foreground">
                        <span className="cursor-pointer" onClick={() => handleLetterSpacing(1)}>▲</span>
                        <span className="cursor-pointer" onClick={() => handleLetterSpacing(-1)}>▼</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-1 justify-end">
                <label className="text-sm ">Ligne</label>
                <div className="flex items-center bg-muted rounded px-2 h-8 w-20 justify-between">
                    <input
                        type="number"
                        value={lineHeight}
                        onChange={(e) => setLineHeight(Number(e.target.value))}
                        className="bg-transparent text-sm w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex flex-col text-[8px] text-muted-foreground">
                        <span className="cursor-pointer" onClick={() => handleLineHeight(1)}>▲</span>
                        <span className="cursor-pointer" onClick={() => handleLineHeight(-1)}>▼</span>
                    </div>
                </div>
            </div>
        </div>
    )
}