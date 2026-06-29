"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { PlayerRef, CallbackListener } from "@remotion/player";

interface EditorContextType {
    playerRef: React.RefObject<PlayerRef | null>;
    isPlaying: boolean;
    seekRelative: (frames: number) => void;
    togglePlay: () => void;
    totalDuration: number;
    setTotalDuration: (duration: number) => void;
    setPlayerRef: (node: PlayerRef | null) => void;
}

export const VideoEditorContext = createContext<EditorContextType | null>(null);

export function VideoEditorProvider({ children }: { children: React.ReactNode }) {
    const [player, setPlayer] = useState<PlayerRef | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [totalDuration, setTotalDuration] = useState(0);

    const playerRef = useRef<PlayerRef | null>(null);

    const setPlayerRef = useCallback((remotionPlayer: PlayerRef | null) => {
        playerRef.current = remotionPlayer;
        setPlayer(remotionPlayer);
    }, []);

    // Écouteurs d'événements branchés sur l'état réactif "player"
    useEffect(() => {
        if (!player) return;

        const onPlay: CallbackListener<'play'> = () => setIsPlaying(true);
        const onPause: CallbackListener<'pause'> = () => setIsPlaying(false);

        player.addEventListener('play', onPlay);
        player.addEventListener('pause', onPause);

        // Synchronisation initiale
        setIsPlaying(player.isPlaying());

        return () => {
            player.removeEventListener('play', onPlay);
            player.removeEventListener('pause', onPause);
        };
    }, [player]);

    const seekRelative = (frames: number) => {
        if (!playerRef.current) return;
        const currentFrame = playerRef.current.getCurrentFrame();
        playerRef.current.seekTo(Math.max(0, currentFrame + frames));
    };

    const togglePlay = () => {
        if (!playerRef.current) return;
        if (playerRef.current.isPlaying()) {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
    };

    return (
        <VideoEditorContext.Provider value={{ playerRef, isPlaying, seekRelative, togglePlay, setPlayerRef, totalDuration, setTotalDuration }}>
            {children}
        </VideoEditorContext.Provider>
    );
}







