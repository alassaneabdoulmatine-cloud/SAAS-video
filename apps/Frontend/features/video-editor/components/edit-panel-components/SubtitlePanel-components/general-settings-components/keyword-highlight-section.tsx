"use client";

import { Switch } from "@/components/ui/switch";
import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

export default function KeywordHighlightSection() {
    const { keywordHighlights, setKeywordHighlights } = useGeneralSubtitleSettingsStore();

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Mots-clés en surbrillance</label>
            <Switch
                checked={keywordHighlights}
                onCheckedChange={setKeywordHighlights}
                className="data-[state=checked]:bg-[#f0a500] data-[state=unchecked]:bg-muted"
            />
        </div>
    );
}
