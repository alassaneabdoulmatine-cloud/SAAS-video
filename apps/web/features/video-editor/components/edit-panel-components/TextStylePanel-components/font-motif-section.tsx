import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bold, Italic, Underline } from "lucide-react"
import { useState } from "react";

const motifs = [
    { id: 1, value: "bold", icon: Bold, label: "Gras" },
    { id: 2, value: "underline", icon: Underline, label: "Souligné" },
    { id: 3, value: "italic", icon: Italic, label: "Italique" },
]

export default function FontMotifSection() {
    const [styles, setStyles] = useState<string[]>([]);
    return (
        <div className="flex max-w-xs items-center justify-between gap-4">
            <label className="text-sm  w-32">Motif</label>
            <div className="w-full flex justify-start">
                <TooltipProvider delayDuration={300}>
                    <ToggleGroup type="multiple" value={styles} onValueChange={setStyles} className="gap-1 bg-muted p-0.5 rounded">
                        {motifs.map((motif) => (

                            <ToggleGroupItem value={motif.value} className="data-[state=on]:bg-background rounded-sm h-8 w-10 p-0">
                                <motif.icon className="h-4 w-4" />
                            </ToggleGroupItem>

                        ))}
                    </ToggleGroup>
                </TooltipProvider>
            </div>
        </div>
    )
}