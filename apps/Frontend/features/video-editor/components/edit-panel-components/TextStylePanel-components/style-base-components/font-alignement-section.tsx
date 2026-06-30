import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

const alignments = [
    { value: "left", icon: AlignLeft, label: "Gauche" },
    { value: "center", icon: AlignCenter, label: "Centré" },
    { value: "right", icon: AlignRight, label: "Droite" },
    { value: "justify", icon: AlignJustify, label: "Justifié" },
    { value: "v-start", icon: null, label: "Haut" },
    { value: "v-center", icon: null, label: "Milieu" },
];

export default function AlignementSection() {
    const { alignment, setAlignment } = useTextStylePropertiesStore();
    return (
        <div className="flex max-w-xs items-center justify-between gap-4">
            <label className="text-sm w-32">Alignement</label>
            <div className="w-full flex justify-start">
                <TooltipProvider delayDuration={300}>
                    <ToggleGroup type="single" value={alignment} onValueChange={(v) => v && setAlignment(v)} className="gap-1 bg-muted p-0.5 border border-border w-full justify-between rounded-sm">
                        {alignments.map(({ value, icon: Icon, label }) => (
                            <ToggleGroupItem value={value} className="data-[state=on]:bg-background rounded-sm h-8 flex-1 p-0 text-xs font-mono">
                                {Icon ? <Icon className="h-4 w-4" /> : "|||"}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </TooltipProvider>
            </div>
        </div>

    )
}