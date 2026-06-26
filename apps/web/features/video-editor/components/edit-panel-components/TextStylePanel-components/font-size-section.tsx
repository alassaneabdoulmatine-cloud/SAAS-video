"use client"

import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function FontSizeSection() {
    const [fontSize, setFontSize] = useState([28]);

    return (
        <div className="space-y-2">
            <label className="text-sm block">Taille de la police</label>
            <div className="flex items-center gap-4">
                <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={100}
                    min={10}
                    step={1}
                    className="flex-1 cursor-pointer"
                />
                {/* Un conteneur input stylé type "spin-button" comme sur ta capture */}
                <div className="flex items-center bg-muted rounded px-2 h-9 w-16 justify-between border-none">
                    <span className="text-sm font-semibold">{fontSize[0]}</span>
                    <div className="flex flex-col text-[10px] text-foreground select-none">
                        <span className="cursor-pointer hover:text-foreground/80" onClick={() => setFontSize([Math.min(100, fontSize[0] + 1)])}>▲</span>
                        <span className="cursor-pointer hover:text-foreground/80" onClick={() => setFontSize([Math.max(10, fontSize[0] - 1)])}>▼</span>
                    </div>
                </div>
            </div>
        </div>
    )
}