"use client";

import { useState, useEffect } from "react";
import { MyVideoComposition } from "./video-composition";
import { staticFile } from "remotion";
import { getMediaMetadata } from "@/lib/helpers";
import { Player } from "@remotion/player";
import { parseSrt, Caption } from "@remotion/captions";
import { useVideoEditor } from "../hooks/use-video-editor";

export default function VideoPlayerPanel() {
    const [isShort, setIsShort] = useState(true);
    const width = isShort ? 1080 : 1920;
    const height = isShort ? 1920 : 1080;

    const { setPlayerRef, setTotalDuration } = useVideoEditor();

    const videoUrl = staticFile("/Top 5 languages (1).mp4");
    const [duration, setDuration] = useState<number>(30);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [parsedSubtitles, setParsedSubtitles] = useState<Caption[]>([]);

    useEffect(() => {
        async function initPlayer() {
            try {
                const response = await fetch("/Top 5 languages (1).srt");
                const srtText = await response.text();
                const { captions } = parseSrt({ input: srtText });
                setParsedSubtitles(captions);

                const metadata = await getMediaMetadata(videoUrl);
                const totalFrames = Math.round(metadata.durationInSeconds * metadata.fps);
                setDuration(totalFrames);
                setTotalDuration(metadata.durationInSeconds);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        initPlayer();
    }, []);

    console.log("render")

    if (isLoading) return <div className="text-white text-sm p-4">Chargement...</div>;

    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className={isShort ? "h-full aspect-9/16" : "w-full aspect-video"}>
                <Player
                    ref={setPlayerRef} // Connecté au contexte !
                    component={MyVideoComposition}
                    inputProps={{
                        videoSrc: videoUrl,
                        subtitles: parsedSubtitles,
                    }}
                    durationInFrames={duration}
                    compositionWidth={width}
                    compositionHeight={height}
                    controls
                    fps={30}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </div>
    );
}