"use client"
import { useState } from "react";
export default function FontColorSection() {
    const [color, setColor] = useState("#ffffff");
    return (
        <div className="flex max-w-xs items-center justify-between gap-4">
            <label className="text-sm w-32">Couleur</label>
            <div className="w-full flex items-center gap-2">
                {/* Input de type color customisé pour ressembler à ton dropdown blanc */}
                <div className="relative flex items-center bg-muted rounded p-1 h-9 w-24 justify-between cursor-pointer">
                    <div
                        className="w-full h-full rounded border border-muted"
                        style={{ backgroundColor: color }}
                    />
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <span className="text-[10px] text-muted-foreground ml-2">▼</span>
                </div>
            </div>
        </div>

    );
}