"use client";

import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

/** Spinner stylisé réutilisable pour les axes numériques */
function SpinnerInput({
    label,
    value,
    unit,
    onIncrement,
    onDecrement,
}: {
    label: string;
    value: number;
    unit: string;
    onIncrement: () => void;
    onDecrement: () => void;
}) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground font-mono text-xs">{label}</span>
            <div className="flex items-center bg-muted border border-border rounded-sm h-8 w-20 px-2 justify-between">
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
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Position</label>
            <div className="flex items-center gap-4">
                <SpinnerInput
                    label="X"
                    value={posX}
                    unit="%"
                    onIncrement={() => setPosX(Math.min(100, posX + 1))}
                    onDecrement={() => setPosX(Math.max(0, posX - 1))}
                />
                <SpinnerInput
                    label="Y"
                    value={posY}
                    unit="%"
                    onIncrement={() => setPosY(Math.min(100, posY + 1))}
                    onDecrement={() => setPosY(Math.max(0, posY - 1))}
                />
            </div>
        </div>
    );
}
