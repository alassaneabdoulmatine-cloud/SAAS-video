

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

const strokePresets = [
    { name: "Discret", thickness: 20 },
    { name: "Moyen", thickness: 45 },
    { name: "Epais", thickness: 80 }
];

export default function TextStrokePresets() {
    const { setStrokeThickness, strokeEnabled, strokeThickness } = useTextStylePropertiesStore();

    const presetvalue = strokePresets.find((preset) => preset.thickness === strokeThickness)?.name || "";

    function handlePresetChange(value: string) {

        if (!value) return;

        const preset = strokePresets.find((preset) => preset.name === value);
        if (preset) {
            setStrokeThickness(preset.thickness);
        }
    }

    return (
        <div>
            <div className={`flex items-center justify-between gap-4 pb-2 ${!strokeEnabled ? "opacity-50" : ""}`}>
                <label className="w-24 text-sm">Presets</label>
                <div className="flex-1">
                    <ToggleGroup
                        type="single"
                        disabled={!strokeEnabled}
                        value={presetvalue}
                        onValueChange={handlePresetChange}
                        className="justify-start bg-muted p-1 border border-border rounded-sm gap-1 w-fit"
                    >
                        {strokePresets.map((preset) => (
                            <ToggleGroupItem
                                key={preset.name}
                                value={preset.name}
                                className="text-xs h-7 px-3 data-[state=on]:bg-background data-[state=on]:rounded-sm cursor-pointer"
                            >
                                {preset.name}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
            </div>
        </div>
    );
}