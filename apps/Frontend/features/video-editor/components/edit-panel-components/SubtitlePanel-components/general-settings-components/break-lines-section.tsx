"use client";

import { Switch } from "@/components/ui/switch";
import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

export default function BreakLinesSection() {
    const { breakLines, setBreakLines } = useGeneralSubtitleSettingsStore();

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Retour à la ligne automatique</label>
            <Switch
                checked={breakLines}
                onCheckedChange={setBreakLines}
                className="data-[state=checked]:bg-[#f0a500] data-[state=unchecked]:bg-muted"
            />
        </div>
    );
}
