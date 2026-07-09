"use client";

import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";
import { Slider } from "@/components/ui/slider";

type SpinnerInputProps = {
    label: string;
    value: number;
    unit: string;
    onIncrement: () => void;
    onDecrement: () => void;
    onSliderChange: (value: number) => void;
};

/** Spinner + Slider réutilisable pour les axes numériques */
function SpinnerInput({
    label,
    value,
    unit,
    onIncrement,
    onDecrement,
    onSliderChange
}: SpinnerInputProps) {
    return (
        <div className="flex items-center gap-3 w-full">
            {/* Label de l'axe (X ou Y) */}
            <span className="text-muted-foreground font-mono text-xs w-3 shrink-0">{label}</span>

            {/* Slider visuel */}
            <Slider
                value={[value]}
                onValueChange={(val) => onSliderChange(val[0])}
                max={100}
                min={0}
                step={1}
                className="flex-1 cursor-pointer"
            />

            <div className="flex items-center bg-muted border border-border rounded-sm h-8 w-20 px-2 justify-between shrink-0">
                <span className="text-foreground text-xs font-mono">
                    {value} {unit}
                </span>
                <div className="flex flex-col text-[8px] text-muted-foreground leading-[5px] gap-0.5 select-none">
                    <span
                        className="cursor-pointer hover:text-foreground transition-colors"
                        onClick={onIncrement}
                    >
                        ▲
                    </span>
                    <span
                        className="cursor-pointer hover:text-foreground transition-colors"
                        onClick={onDecrement}
                    >
                        ▼
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function PositionSection() {
    const { posX, posY, setPosX, setPosY } = useGeneralSubtitleSettingsStore();

    return (
        <div className="space-y-3 w-full">
            <label className="text-sm font-medium block">Position</label>

            <div className="space-y-2">
                <SpinnerInput
                    label="X"
                    value={posX}
                    unit="%"
                    onIncrement={() => setPosX(Math.min(100, posX + 1))}
                    onDecrement={() => setPosX(Math.max(0, posX - 1))}
                    onSliderChange={setPosX}
                />
                <SpinnerInput
                    label="Y"
                    value={posY}
                    unit="%"
                    onIncrement={() => setPosY(Math.min(100, posY + 1))}
                    onDecrement={() => setPosY(Math.max(0, posY - 1))}
                    onSliderChange={setPosY}
                />
            </div>
        </div>
    );
}