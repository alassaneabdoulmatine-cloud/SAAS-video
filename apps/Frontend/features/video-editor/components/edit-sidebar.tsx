'use client';
import { Captions, ChevronLeft, Home, Palette, Settings } from "lucide-react";
import { useLeftBarViewStore } from "../store/leftbarview";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
const tabs = [
    {
        id: "style",
        label: "Style",
        icon: Palette,
    },
    {
        id: "subtitles",
        label: "Sous-titres",
        icon: Captions,
    },
    {
        id: "parametre",
        label: "Parametre",
        icon: Settings,
    }
]
export default function EditSidebar() {

    const { setSelectedView, selectedView } = useLeftBarViewStore();
    const router = useRouter();

    return (
        <div className="h-full bg-muted/40">
            <aside className="w-[76px] border-r border-border flex flex-col items-center py-4 gap-4 h-full">
                <Tooltip>
                    <TooltipTrigger>

                        <div className="flex items-center gap-1 p-2 hover:bg-muted rounded-md cursor-pointer border" onClick={() => router.back()}>
                            <ChevronLeft className="h-5 w-5" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>Retour</p>
                    </TooltipContent>
                </Tooltip>

                {tabs.map((tab) => (
                    <div className="flex flex-col items-center gap-1 cursor-pointer w-full px-1" key={tab.id} onClick={() => setSelectedView(tab.id as any)}>
                        <div className={`p-2 rounded-md flex items-center justify-center ${selectedView === tab.id ? 'bg-primary' : 'hover:bg-muted'}`}>
                            <tab.icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-medium tracking-tight">{tab.label}</span>
                    </div>
                ))}
            </aside>
        </div>
    )
}