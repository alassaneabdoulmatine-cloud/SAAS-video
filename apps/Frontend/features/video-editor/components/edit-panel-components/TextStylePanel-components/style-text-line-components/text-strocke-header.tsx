import { Checkbox } from "@/components/ui/checkbox";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RotateCcw } from "lucide-react";
import { useTextStylePropertiesStore } from "@/features/video-editor/store/text-style-properties-store";

type Props = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export default function TextStrokeHeader({ isOpen, setIsOpen }: Props) {
    const { 
        strokeEnabled, 
        setStrokeEnabled,
        setStrokeColor,
        setStrokeThickness
    } = useTextStylePropertiesStore();

    function handleCheckboxChange(checked: boolean) {
        setStrokeEnabled(checked);
        if (checked) {
            setIsOpen(true);
        }
    }

    function handleReset() {
        setStrokeColor("#000000");
        setStrokeThickness(45);
    }

    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <Checkbox
                    checked={strokeEnabled}
                    onCheckedChange={handleCheckboxChange}
                />

                <Tooltip>
                    <TooltipTrigger asChild>
                        <CollapsibleTrigger asChild>
                            <label
                                className="cursor-pointer flex items-center gap-1.5 text-sm font-semibold hover:text-neutral-200 transition-colors"
                            >
                                Trait
                                <span className={`text-[10px] text-neutral-500 transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}>
                                    ▲
                                </span>
                            </label>
                        </CollapsibleTrigger>
                    </TooltipTrigger>

                    <TooltipContent>
                        <p>{isOpen ? "Masquer" : "Afficher"}</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <RotateCcw 
                            className={`h-4 w-4 cursor-pointer hover:text-foreground transition-colors ${!strokeEnabled ? "opacity-50 pointer-events-none" : ""}`} 
                            onClick={handleReset} 
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Réinitialiser le contour</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}