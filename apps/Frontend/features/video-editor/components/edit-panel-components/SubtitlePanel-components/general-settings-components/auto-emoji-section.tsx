"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGeneralSubtitleSettingsStore } from "@/features/video-editor/store/general-subtitle-settings-store";

const emojiOptions = [
    { value: "none", label: "Aucun" },
    { value: "above", label: "Au-dessus" },
    { value: "inline", label: "Dans le texte" },
];

export default function AutoEmojiSection() {
    const { autoEmoji, setAutoEmoji } = useGeneralSubtitleSettingsStore();

    return (
        <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Auto Emoji</label>
            <Select value={autoEmoji} onValueChange={setAutoEmoji}>
                <SelectTrigger className="w-40 h-8 rounded-sm text-xs focus:ring-0 focus:ring-offset-0">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {emojiOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
