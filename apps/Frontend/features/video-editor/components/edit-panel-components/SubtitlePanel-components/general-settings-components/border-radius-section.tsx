"use client";

import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

export default function BorderRadiusSection() {
    const { borderRadius, setBorderRadius } = useGeneralSubtitleSettingsStore();

    function increment() {
        setBorderRadius(parseFloat((borderRadius + 0.1).toFixed(1)));
    }

    function decrement() {
        setBorderRadius(Math.max(0, parseFloat((borderRadius - 0.1).toFixed(1))));
    }

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Rayon des bordures</label>
            <div className="flex items-center bg-muted border border-border rounded-sm h-8 w-24 px-2 justify-between">
                <span className="text-foreground text-xs font-mono">{borderRadius} em</span>
                <div className="flex flex-col text-[8px] text-muted-foreground leading-[5px] gap-0.5 select-none">
                    <span
                        className="cursor-pointer hover:text-foreground transition-colors"
                        onClick={increment}
                    >
                        ▲
                    </span>
                    <span
                        className="cursor-pointer hover:text-foreground transition-colors"
                        onClick={decrement}
                    >
                        ▼
                    </span>
                </div>
            </div>
        </div>
    );
}
