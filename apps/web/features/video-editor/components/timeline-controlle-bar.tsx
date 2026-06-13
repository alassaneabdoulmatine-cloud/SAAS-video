"use client";

import { useState } from "react";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TimelineControlBar() {
    // 💡 États locaux pour piloter l'interface (à connecter à ton store global ou Remotion plus tard)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState("00:01");
    const [totalTime, setTotalTime] = useState("01:40");
    const [zoomValue, setZoomValue] = useState(50); // Pourcentage de zoom

    return (
        <div className="w-full h-14  flex items-center justify-center px-4 select-none text-zinc-200 font-sans text-sm">



            {/* SECTION CENTRALE : Lecteur et Timecode (Style After Effects) */}
            <div className="flex items-center justify-center gap-4">
                {/* Boutons de transport */}
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="p-2 transition-colors bg-secondary/50 rounded-full hover:bg-secondary cursor-pointer">
                                <SkipBack className="w-4 h-4 text-foreground" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>reculer d'une image</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-2.5 bg-secondary text-foreground rounded-full hover:bg-ring/30 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                            >
                                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isPlaying ? "mettre la vidéo en pause" : "lire la vidéo"}</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="p-2 transition-colors bg-secondary/50 rounded-full hover:bg-secondary cursor-pointer">
                                <SkipForward className="w-4 h-4 text-foreground" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add to library</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Timecode digital */}
                <div className="text-foreground text-sm font-mono flex gap-4">
                    <span>{currentTime}</span>
                    <span> / </span>
                    <span>{totalTime}</span>
                </div>
            </div>

        </div>
    );
}

import { Button } from "@/components/ui/button"


export function TooltipDemo() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Add to library</p>
            </TooltipContent>
        </Tooltip>
    )
}
