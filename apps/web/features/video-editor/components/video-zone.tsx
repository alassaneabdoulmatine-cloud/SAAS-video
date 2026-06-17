// "use client";

// import { useState, useEffect, useRef } from "react";
// import { MyVideoComposition } from "./video-composition";
// import { staticFile } from "remotion";
// import { getMediaMetadata } from "@/lib/helpers";
// import { Player, PlayerRef } from "@remotion/player";
// import { parseSrt, Caption } from "@remotion/captions"; // ◄ Ajout du type Caption
// import { useClickToPlayStore } from "../store/click-to=play-store";

// export default function VideoPlayerPanel() {
//     const [isShort, setIsShort] = useState(true);
//     const width = isShort ? 1080 : 1920;
//     const height = isShort ? 1920 : 1080;
//     const { isPlaying } = useClickToPlayStore();
//     const playerRef = useRef<PlayerRef>(null);

//     useEffect(() => {
//         if (isPlaying) {
//             playerRef.current?.play();
//         } else {
//             playerRef.current?.pause();
//         }
//     }, [isPlaying]);

//     const videoUrl = staticFile("/Top 5 languages (1).mp4");

//     const [duration, setDuration] = useState<number>(30);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     // 🚀 On stocke directement les sous-titres sous forme de tableau d'objets parsés
//     const [parsedSubtitles, setParsedSubtitles] = useState<Caption[]>([]);

//     useEffect(() => {
//         async function initPlayer() {
//             try {
//                 // 1. Charger le fichier SRT/TXT
//                 const response = await fetch("/Top 5 languages (1).srt");
//                 const srtText = await response.text();

//                 // On parse immédiatement le SRT en tableau de Captions
//                 const { captions } = parseSrt({ input: srtText });
//                 setParsedSubtitles(captions);


//                 // 2. Extraire la durée via Mediabunny
//                 const metadata = await getMediaMetadata(videoUrl);
//                 const totalFrames = Math.round(metadata.durationInSeconds * metadata.fps);
//                 setDuration(totalFrames);

//                 // Tout est prêt, on coupe le loader unique
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Erreur lors de l'initialisation du Player :", error);
//                 setIsLoading(false);
//             }
//         }

//         initPlayer();
//     }, [videoUrl]);

//     // console.log("parsedSubtitles", parsedSubtitles);

//     // On affiche le loader tant que la vidéo ET les sous-titres ne sont pas prêts
//     if (isLoading) {
//         return <div className="text-white text-sm p-4">Chargement des éléments...</div>;
//     }

//     return (
//         <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4 min-h-0 min-w-0">
//             <div className={`
//                 max-w-full max-h-full overflow-hidden flex items-center justify-center
//                 ${isShort ? "h-full w-auto aspect-9/16" : "w-full h-auto aspect-video"}
//             `}>
//                 <Player
//                     ref={playerRef}
//                     component={MyVideoComposition}
//                     inputProps={{
//                         videoSrc: videoUrl,
//                         subtitles: parsedSubtitles,
//                     }}
//                     durationInFrames={duration}
//                     compositionWidth={width}
//                     compositionHeight={height}
//                     controls
//                     fps={30}
//                     style={{ width: "100%", height: "100%" }}
//                 />
//             </div>
//         </div>
//     );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import { MyVideoComposition } from "./video-composition";
import { staticFile } from "remotion";
import { getMediaMetadata } from "@/lib/helpers";
import { Player, PlayerRef } from "@remotion/player";
import { parseSrt, Caption } from "@remotion/captions";
import { useClickToPlayStore } from "../store/click-to=play-store";
import { useStyleVariantStore } from "../store/style-variant-store";

export default function VideoPlayerPanel() {
    const [isShort, setIsShort] = useState(true);
    const width = isShort ? 1080 : 1920;
    const height = isShort ? 1920 : 1080;

    // On récupère l'état courant du store
    const { isPlaying, togglePlay } = useClickToPlayStore();
    const { stylevariant } = useStyleVariantStore();

    const playerRef = useRef<PlayerRef>(null);
    const videoUrl = staticFile("/Top 5 languages (1).mp4");

    const [duration, setDuration] = useState<number>(30);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [parsedSubtitles, setParsedSubtitles] = useState<Caption[]>([]);


    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        const playerIsPlaying = player.isPlaying();

        // On force le play/pause uniquement s'il y a une vraie différence constatée
        if (isPlaying && !playerIsPlaying) {
            player.play();
        } else if (!isPlaying && playerIsPlaying) {
            player.pause();
        }
    }, [isPlaying]);

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

                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors de l'initialisation du Player :", error);
                setIsLoading(false);
            }
        }

        initPlayer();
    }, []);

    if (isLoading) {
        return <div className="text-white text-sm p-4">Chargement des éléments...</div>;
    }

    return (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4 min-h-0 min-w-0">
            <div className={`
                max-w-full max-h-full overflow-hidden flex items-center justify-center
                ${isShort ? "h-full w-auto aspect-9/16" : "w-full h-auto aspect-video"}
            `}>
                <Player
                    ref={playerRef}
                    component={MyVideoComposition}
                    inputProps={{
                        videoSrc: videoUrl,
                        subtitles: parsedSubtitles,
                        styleType: stylevariant,
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