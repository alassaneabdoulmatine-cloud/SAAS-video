"use client";

import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

export default function StyleColorsSection() {
    const { styleColors, setStyleColors } = useGeneralSubtitleSettingsStore();

    // Met à jour la couleur spécifique à son index dans le tableau du store
    const handleColorChange = (newColor: string, indexToUpdate: number) => {
        const updatedColors = styleColors.map((color, index) =>
            index === indexToUpdate ? newColor : color
        );
        setStyleColors(updatedColors);
    };

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Couleurs du style</label>
            <div className="flex items-center bg-muted border border-border p-1 rounded gap-1.5">
                {styleColors.map((color, index) => (
                    /* relative est indispensable ici pour l'input caché */
                    <div key={index} className="relative w-5 h-5">
                        <div
                            className="w-full h-full rounded-sm cursor-pointer border border-border/50 transition-transform hover:scale-110"
                            style={{ backgroundColor: color }}
                            title={color}
                        />
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => handleColorChange(e.target.value, index)}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
