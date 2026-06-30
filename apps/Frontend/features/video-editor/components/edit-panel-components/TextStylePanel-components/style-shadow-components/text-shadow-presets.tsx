"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

const shadowPresets = [
    { name: "legere", label: "Légère", color: "#000000", opacity: 40, blur: 10, distance: 3, angle: -45 },
    { name: "moyenne", label: "Moyenne", color: "#000000", opacity: 70, blur: 15, distance: 5, angle: -45 },
    { name: "prononcee", label: "Prononcée", color: "#000000", opacity: 95, blur: 25, distance: 10, angle: -45 },
];

export default function TextShadowPresets() {
    const {
        shadowEnabled,
        shadowColor,
        shadowOpacity,
        shadowBlur,
        shadowDistance,
        shadowAngle,
        setShadowColor,
        setShadowOpacity,
        setShadowBlur,
        setShadowDistance,
        setShadowAngle
    } = useTextStylePropertiesStore();

    // Trouve si les valeurs correspondent à un preset exact
    const matchingPreset = shadowPresets.find(
        (preset) =>
            preset.color.toLowerCase() === shadowColor.toLowerCase() &&
            preset.opacity === shadowOpacity &&
            preset.blur === shadowBlur &&
            preset.distance === shadowDistance &&
            preset.angle === shadowAngle
    );

    const activePreset = matchingPreset ? matchingPreset.name : "custom";

    function handlePresetChange(value: string) {
        if (!value) return;

        const preset = shadowPresets.find((p) => p.name === value);
        if (preset) {
            setShadowColor(preset.color);
            setShadowOpacity(preset.opacity);
            setShadowBlur(preset.blur);
            setShadowDistance(preset.distance);
            setShadowAngle(preset.angle);
        }
    }

    return (
        <div className={`flex items-center justify-between gap-4 pb-2 border-b border-border/60 ${!shadowEnabled ? "opacity-50" : ""}`}>
            <label className="w-24 text-sm">Presets</label>
            <div className="flex-1 flex items-center gap-3">
                <ToggleGroup
                    type="single"
                    disabled={!shadowEnabled}
                    value={matchingPreset ? activePreset : ""}
                    onValueChange={handlePresetChange}
                    className="justify-start bg-muted p-1 border border-border rounded-sm gap-1 w-fit"
                >
                    {shadowPresets.map((preset) => (
                        <ToggleGroupItem
                            key={preset.name}
                            value={preset.name}
                            className="text-xs h-7 px-3 data-[state=on]:bg-background data-[state=on]:rounded-sm cursor-pointer"
                        >
                            {preset.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                {activePreset === "custom" && (
                    <span className="text-[10px] text-primary px-2 italic font-medium">
                        Réglage personnalisé
                    </span>
                )}
            </div>
        </div>
    );
}
