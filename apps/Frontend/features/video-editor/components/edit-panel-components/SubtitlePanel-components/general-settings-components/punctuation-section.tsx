"use client";

import { Switch } from "@/components/ui/switch";
import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

export default function PunctuationSection() {
    const { punctuation, setPunctuation } = useGeneralSubtitleSettingsStore();

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Ponctuation</label>
            <Switch
                checked={punctuation}
                onCheckedChange={setPunctuation}
                className="data-[state=checked]:bg-[#f0a500] data-[state=unchecked]:bg-muted"
            />
        </div>
    );
}
