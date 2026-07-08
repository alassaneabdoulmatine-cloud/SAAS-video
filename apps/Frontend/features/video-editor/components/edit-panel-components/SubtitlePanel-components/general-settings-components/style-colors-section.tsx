"use client";

import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

export default function StyleColorsSection() {
    const { styleColors } = useGeneralSubtitleSettingsStore();

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Couleurs du style</label>
            <div className="flex items-center bg-muted border border-border p-1 rounded gap-1.5">
                {styleColors.map((color, index) => (
                    <div
                        key={index}
                        className="w-5 h-5 rounded-sm cursor-pointer border border-border/50 transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                        title={color}
                    />
                ))}
            </div>
        </div>
    );
}
