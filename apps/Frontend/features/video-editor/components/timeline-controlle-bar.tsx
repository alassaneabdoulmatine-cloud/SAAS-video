
"use client";

import { useEffect, useRef } from "react";
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
} from "@/components/ui/tooltip";
import { useVideoEditor } from "../hooks/use-video-editor";
import { CallbackListener } from "@remotion/player";

// Petite fonction utilitaire pour formater en MM:SS
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function TimelineControlBar() {
    const { isPlaying, togglePlay, seekRelative, playerRef, totalDuration } = useVideoEditor();
    const timingRef = useRef<HTMLDivElement>(null);
    const fps = 30;

    useEffect(() => {
        const playerInstance = playerRef.current;
        if (!playerInstance) return;

        const durationText = formatTime(totalDuration);

        if (timingRef.current) {
            timingRef.current.innerText = `00:00 / ${durationText}`;
        }

        // 2. Typage strict avec CallbackListener de Remotion pour éviter l'erreur TS
        const onTimeUpdate: CallbackListener<"timeupdate"> = (e) => {
            if (timingRef.current) {
                const currentSeconds = e.detail.frame / fps;
                timingRef.current.innerText = `${formatTime(currentSeconds)} / ${durationText}`;
            }
        };

        playerInstance.addEventListener("timeupdate", onTimeUpdate);
        return () => playerInstance.removeEventListener("timeupdate", onTimeUpdate);
    }, [playerRef, fps, totalDuration]);

    return (
        <div className="w-full h-14 flex items-center justify-center px-4 select-none text-zinc-200 font-sans text-sm">
            <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-1">
                    {/* BOUTON RECULER */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={() => seekRelative(-1)} className="p-2 transition-colors bg-secondary/50 rounded-full hover:bg-secondary cursor-pointer">
                                <SkipBack className="w-4 h-4 text-foreground" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>reculer d'une image</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* BOUTON PLAY / PAUSE */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => togglePlay()}
                                className="p-2.5 bg-secondary text-foreground rounded-full hover:bg-ring/30 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                            >
                                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isPlaying ? "mettre la vidéo en pause" : "lire la vidéo"}</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* BOUTON AVANCER */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={() => seekRelative(1)} className="p-2 transition-colors bg-secondary/50 rounded-full hover:bg-secondary cursor-pointer">
                                <SkipForward className="w-4 h-4 text-foreground" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>avancer d'une image</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* 🚀 LE TIMER SYNCHRONISÉ SUPER PERFORMANT */}
                <div
                    ref={timingRef}
                    className="text-foreground text-sm font-mono select-none"
                >
                    00:00 / 00:00
                </div>
            </div>
        </div>
    );
}