"use client";

import { Slider } from "@/components/ui/slider";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

export default function TextShadowBlur() {
    const { shadowEnabled, shadowBlur, setShadowBlur } = useTextStylePropertiesStore();

    function handleIncrease() {
        if (!shadowEnabled) return;
        setShadowBlur(Math.min(100, shadowBlur + 1));
    }

    function handleDecrease() {
        if (!shadowEnabled) return;
        setShadowBlur(Math.max(0, shadowBlur - 1));
    }

    return (
        <div className={`flex items-center justify-between gap-4 ${!shadowEnabled ? "opacity-50" : ""}`}>
            <label className="w-24">Flou</label>
            <div className="flex-1 flex items-center gap-4">
                <Slider
                    value={[shadowBlur]}
                    onValueChange={(value) => setShadowBlur(value[0])}
                    disabled={!shadowEnabled}
                    max={100} min={0} step={1}
                    className="flex-1 cursor-pointer"
                />
                <div className="flex items-center bg-muted rounded-sm px-2 h-8 w-20 justify-between border border-border">
                    <span className="text-sm font-mono">{shadowBlur}%</span>
                    <div className="flex flex-col text-[8px] text-neutral-400 select-none">
                        <span className="cursor-pointer hover:text-primary" onClick={handleIncrease}>▲</span>
                        <span className="cursor-pointer hover:text-primary" onClick={handleDecrease}>▼</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
