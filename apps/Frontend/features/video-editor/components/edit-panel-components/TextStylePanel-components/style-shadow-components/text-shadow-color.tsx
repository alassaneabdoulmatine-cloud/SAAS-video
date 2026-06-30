"use client";

import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

export default function TextShadowColor() {
    const { shadowEnabled, shadowColor, setShadowColor } = useTextStylePropertiesStore();

    return (
        <div className={`flex items-center justify-between gap-4 ${!shadowEnabled ? "opacity-50" : ""}`}>
            <label className="w-24">Couleur</label>
            <div className="flex-1 flex items-center justify-between">
                <div className="relative flex items-center bg-muted rounded-sm p-1 h-8 w-28 justify-between cursor-pointer border border-border">
                    <div className="w-full h-full rounded-sm" style={{ backgroundColor: shadowColor }} />
                    <input
                        type="color"
                        value={shadowColor}
                        disabled={!shadowEnabled}
                        onChange={(e) => { setShadowColor(e.target.value) }}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <span className="text-[10px] text-neutral-400 ml-2">▼</span>
                </div>
            </div>
        </div>
    );
}
