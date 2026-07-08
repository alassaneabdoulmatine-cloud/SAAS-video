"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

export default function WordsPerLineSection() {
    const { wordPerLine, setWordPerLine } = useGeneralSubtitleSettingsStore();

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Mots par ligne</label>
            <Select value={wordPerLine} onValueChange={setWordPerLine}>
                <SelectTrigger className="w-40 h-8 rounded-sm text-xs focus:ring-0 focus:ring-offset-0">
                    <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                    {["1", "2", "3", "4", "5"].map((n) => (
                        <SelectItem key={n} value={n}>
                            {n} mot{parseInt(n) > 1 ? "s" : ""}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
