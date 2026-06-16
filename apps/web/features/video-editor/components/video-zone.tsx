// "use client";

// import { useState, useEffect } from "react";
// import { MyVideoComposition } from "./video-composition";
// import { staticFile } from "remotion";
// import { getMediaMetadata } from "@/lib/helpers";
// import { Player } from "@remotion/player";
// import { parseSrt } from "@remotion/captions";

// export default function VideoPlayerPanel() {
//     const [isShort, setIsShort] = useState(true);
//     const width = isShort ? 1080 : 1920;
//     const height = isShort ? 1920 : 1080;

//     const videoUrl = staticFile("/Top 5 languages (1).mp4");

//     const [duration, setDuration] = useState<number>(30);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [caption, setCaption] = useState<any>("");

//     // Tes sous-titres
//     const [subtitles, setSubtitles] = useState([
//         { text: "Les", startFrame: 10, endFrame: 20, color: "#FFFFFF", emoji: null },
//         { text: "5 LANGAGES", startFrame: 21, endFrame: 45, color: "#FFFF00", emoji: "🔥" },
//         { text: "les plus", startFrame: 46, endFrame: 55, color: "#FFFFFF", emoji: null },
//         { text: "utilisés", startFrame: 56, endFrame: 65, color: "#FFFFFF", emoji: null },
//         { text: "en", startFrame: 66, endFrame: 70, color: "#FFFFFF", emoji: null },
//         { text: "développement", startFrame: 71, endFrame: 90, color: "#FFFFFF", emoji: "💻" },
//         { text: "web", startFrame: 91, endFrame: 95, color: "#FFFFFF", emoji: null },
//         { text: "en", startFrame: 100, endFrame: 105, color: "#FFFFFF", emoji: null },
//         { text: "2026", startFrame: 106, endFrame: 120, color: "#FF0000", emoji: "🚀" },
//     ]);

//     useEffect(() => {
//         async function getcaption() {
//             const response = await fetch("/Top 5 languages (1).txt");
//             const data = await response.text();
//             setCaption(`${data}`);
//         }
//         getcaption();
//     }, []);


//     useEffect(() => {
//         async function fetchVideoDuration() {
//             try {
//                 // 🚀 Extraction via Mediabunny !
//                 const metadata = await getMediaMetadata(videoUrl);
//                 const totalFrames = Math.round(metadata.durationInSeconds * metadata.fps);

//                 setDuration(totalFrames);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Erreur Mediabunny :", error);
//                 setIsLoading(false);
//             }
//         }

//         fetchVideoDuration();
//     }, [videoUrl]);

//     if (isLoading) {
//         return <div className="text-white text-sm p-4">Analyse Mediabunny en cours...</div>;
//     }

//     const { captions } = parseSrt({ input: caption });

//     console.log("==============================================");
//     console.log(captions);
//     console.log("==============================================");

//     return (
//         <div className="w-full h-full flex flex-col gap-2 items-center justify-center p-4 min-h-0 min-w-0">
//             <div className={`
//                 max-w-full max-h-full overflow-hidden flex items-center justify-center
//                 ${isShort ? "h-full w-auto aspect-9/16" : "w-full h-auto aspect-video"}
//             `}>
//                 <Player
//                     component={MyVideoComposition}
//                     inputProps={{
//                         videoSrc: videoUrl,
//                         subtitles: subtitles
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

import { useState, useEffect } from "react";
import { MyVideoComposition } from "./video-composition";
import { staticFile } from "remotion";
import { getMediaMetadata } from "@/lib/helpers";
import { Player } from "@remotion/player";
import { parseSrt, Caption } from "@remotion/captions"; // ◄ Ajout du type Caption

export default function VideoPlayerPanel() {
    const [isShort, setIsShort] = useState(true);
    const width = isShort ? 1080 : 1920;
    const height = isShort ? 1920 : 1080;

    const videoUrl = staticFile("/Top 5 languages (1).mp4");

    const [duration, setDuration] = useState<number>(30);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // 🚀 On stocke directement les sous-titres sous forme de tableau d'objets parsés
    const [parsedSubtitles, setParsedSubtitles] = useState<Caption[]>([]);

    useEffect(() => {
        async function initPlayer() {
            try {
                // 1. Charger le fichier SRT/TXT
                const response = await fetch("/Top 5 languages (1).srt");
                const srtText = await response.text();

                // On parse immédiatement le SRT en tableau de Captions
                const { captions } = parseSrt({ input: srtText });
                setParsedSubtitles(captions);


                // 2. Extraire la durée via Mediabunny
                const metadata = await getMediaMetadata(videoUrl);
                const totalFrames = Math.round(metadata.durationInSeconds * metadata.fps);
                setDuration(totalFrames);

                // Tout est prêt, on coupe le loader unique
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur lors de l'initialisation du Player :", error);
                setIsLoading(false);
            }
        }

        initPlayer();
    }, [videoUrl]);

    // console.log("parsedSubtitles", parsedSubtitles);

    // On affiche le loader tant que la vidéo ET les sous-titres ne sont pas prêts
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
                    component={MyVideoComposition}
                    inputProps={{
                        videoSrc: videoUrl,
                        subtitles: parsedSubtitles // 🚀 On envoie les vrais sous-titres dynamiques du SRT !
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