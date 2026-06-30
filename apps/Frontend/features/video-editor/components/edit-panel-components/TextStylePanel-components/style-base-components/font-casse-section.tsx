import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

const casings = [
    { id: 1, value: "uppercase", label: "Majuscules", icon: "TT" },
    { id: 2, value: "lowercase", label: "Minuscules", icon: "tt" },
    { id: 3, value: "capitalize", label: "Capitaliser", icon: "Tt" },
];

export default function FontCasseSection() {
    const { casing, setCasing } = useTextStylePropertiesStore();
    return (
        <div className="flex max-w-xs items-center justify-between gap-4">
            <label className="text-sm w-32">Casse</label>
            <div className="w-full flex justify-start">
                <ToggleGroup type="single" value={casing} onValueChange={(v) => v && setCasing(v)} className="gap-1 bg-muted p-0.5 border border-border rounded-sm">
                    {casings.map((casing) => (

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <ToggleGroupItem key={casing.id} value={casing.value} className="data-[state=on]:bg-background rounded-sm h-8 px-3 text-sm">
                                    {casing.icon}
                                </ToggleGroupItem>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>{casing.label}</p>
                            </TooltipContent>
                        </Tooltip>

                    ))}
                </ToggleGroup>
            </div>
        </div>

    );
}