"use client"

import { Slider } from "@/components/ui/slider";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

export default function FontSizeSection() {
    const { fontSize, setFontSize } = useTextStylePropertiesStore();

    const FontSizeValue = [fontSize]
    function handleFontSizeValue(value: number[]) {
        setFontSize(value[0]);
    }

    return (
        <div className="space-y-2">
            <label className="text-sm block">Taille de la police</label>
            <div className="flex items-center gap-4">
                <Slider
                    value={FontSizeValue}
                    onValueChange={handleFontSizeValue}
                    max={100}
                    min={10}
                    step={1}
                    className="flex-1 cursor-pointer"
                />
                {/* Un conteneur input stylé type "spin-button" comme sur ta capture */}
                <div className="flex items-center bg-muted rounded px-2 h-9 w-16 justify-between border-none">
                    <span className="text-sm font-semibold">{fontSize}</span>
                    <div className="flex flex-col text-[10px] text-foreground select-none">
                        <span className="cursor-pointer hover:text-foreground/80"
                            onClick={() => setFontSize(fontSize + 1)}
                        >▲</span>
                        <span className="cursor-pointer hover:text-foreground/80"
                            onClick={() => setFontSize(fontSize - 1)}
                        >▼</span>
                    </div>
                </div>
            </div>
        </div>
    )
}