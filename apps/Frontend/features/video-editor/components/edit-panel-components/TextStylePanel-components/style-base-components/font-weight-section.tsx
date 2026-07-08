"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

const fontWeights = [
    { value: "100", label: "Thin (100)" },
    { value: "200", label: "Extra Light (200)" },
    { value: "300", label: "Light (300)" },
    { value: "400", label: "Normal (400)" },
    { value: "500", label: "Medium (500)" },
    { value: "600", label: "Semi Bold (600)" },
    { value: "700", label: "Bold (700)" },
    { value: "800", label: "Extra Bold (800)" },
    { value: "900", label: "Black (900)" },
];

export default function FontWeightSection() {
    const { fontWeight, setFontWeight } = useTextStylePropertiesStore();

    return (
        <div className="flex items-center gap-4">
            <label className="w-32 shrink-0 text-sm font-medium">
                Épaisseur
            </label>

            <div className="flex-1">
                <Select value={fontWeight} onValueChange={setFontWeight}>
                    <SelectTrigger className="w-full h-9 rounded-sm">
                        <SelectValue placeholder="Choisir une épaisseur" />
                    </SelectTrigger>

                    <SelectContent className="shadow-md border" position="popper">
                        <div className="p-2">
                            {fontWeights.map((weight) => (
                                <SelectItem key={weight.value} value={weight.value} className="p-2">
                                    <span style={{ fontWeight: weight.value as any }}>
                                        {weight.label}
                                    </span>
                                </SelectItem>
                            ))}
                        </div>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
