import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from '@remotion/media';
import { Caption } from "@remotion/captions";



type MyVideoCompositionProps = {
    videoSrc: string;
    subtitles: Caption[];
};

export const MyVideoComposition = ({ videoSrc, subtitles }: MyVideoCompositionProps) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const currentMs = (frame / fps) * 1000;

    // Trouver si un mot doit s'afficher à la frame actuelle
    const currentWord = subtitles.find(
        (sub) => currentMs >= sub.startMs && currentMs <= sub.endMs
    );

    return (
        <AbsoluteFill>
            {/* 🎥 Calque 1 : La vidéo de fond (gérée de manière fluide par Remotion) */}
            <AbsoluteFill>
                <Video src={videoSrc} className="w-full h-full object-contain" />
            </AbsoluteFill>

            {/* ✍️ Calque 2 : Les sous-titres IA superposés au centre */}
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 100 }}>
                {currentWord && (
                    <div
                        style={{
                            color: "white",
                            fontSize: 50,
                            fontWeight: "bold",
                            textShadow: "0px 4px 10px rgba(0,0,0,0.8)",
                            fontFamily: "Impact, sans-serif",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 10
                        }}
                    >


                        {/* Le mot stylisé */}
                        <span>{currentWord.text.toUpperCase()}</span>
                    </div>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};


// "use client";

// import { AbsoluteFill, Video, useCurrentFrame, useVideoConfig } from "remotion";
// import { createTikTokStyleCaptions, Caption } from "@remotion/captions";

// type MyVideoCompositionProps = {
//     videoSrc: string;
//     subtitles: Caption[]; // 🚀 Reçoit le tableau typé officiel de Remotion
// };

// export const MyVideoComposition = ({ videoSrc, subtitles }: MyVideoCompositionProps) => {
//     const frame = useCurrentFrame();
//     const { fps } = useVideoConfig();

//     // 1. 🔄 LA FORMULE CLÉ : Convertir la frame actuelle en Millisecondes
//     const currentMs = (frame / fps) * 1000;

//     // 2. ⚡ Utilisation de la fonction officielle de Remotion
//     // On règle un temps de regroupement bas (ex: 200ms) pour garder l'effet mot par mot dynamique
//     const { pages } = createTikTokStyleCaptions({
//         captions: subtitles,
//         combineTokensWithinMilliseconds: 2,
//     });

//     // 3. 🔍 Trouver la "page" de sous-titre active à la milliseconde actuelle
//     const activePage = pages.find(
//         (page) => currentMs >= page.startMs && currentMs <= page.startMs + page.durationMs
//     );

//     return (
//         <AbsoluteFill className="bg-slate-950">
//             {/* Ta vidéo en arrière-plan */}
//             <Video src={videoSrc} className="w-full h-full object-cover" />

//             {/* 🎤 Ton calque de sous-titres TikTok calé en ms */}
//             {activePage && (
//                 <AbsoluteFill className="justify-center items-center pointer-events-none pb-20">
//                     <div
//                         style={{
//                             whiteSpace: "pre", // ⚠️ OBLIGATOIRE d'après la doc pour garder les espaces
//                             textShadow: "5px 5px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000",
//                             fontFamily: "Impact, Montserrat, sans-serif",
//                         }}
//                         className="text-7xl font-black italic text-yellow-400 uppercase text-center max-w-[85%] tracking-wide animate-pop"
//                     >
//                         {activePage.text}
//                     </div>
//                 </AbsoluteFill>
//             )}
//         </AbsoluteFill>
//     );
// };