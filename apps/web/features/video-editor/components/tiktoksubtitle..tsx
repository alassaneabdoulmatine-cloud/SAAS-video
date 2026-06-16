import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { createTikTokStyleCaptions } from '@remotion/captions';

export const TikTokSubtitles = ({ whisperCaptions }: { whisperCaptions: any }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // 1. On transforme le temps actuel en millisecondes car l'API attend des Ms
    const currentMs = (frame / fps) * 1000;

    // 2. On génère les pages TikTok à partir des données brutes de Whisper
    // 💡 Astuce : tu peux rendre le paramètre 'combineTokensWithinMilliseconds' 
    // dynamique en laissant l'utilisateur le choisir via un curseur sur ton SaaS !
    const { pages } = createTikTokStyleCaptions({
        captions: whisperCaptions,
        combineTokensWithinMilliseconds: 300, // Bas pour du mot par mot rapide
    });

    // 3. On trouve la page active à la milliseconde actuelle
    const activePage = pages.find(
        (page) => currentMs >= page.startMs && currentMs <= page.startMs + page.durationMs
    );

    if (!activePage) return null;

    return (
        <AbsoluteFill className="justify-center items-center pointer-events-none">
            {/* ⚠️ Attention : La doc insiste bien sur le style 'white-space: pre' */}
            <div
                style={{
                    whiteSpace: "pre",
                    textShadow: "4px 4px 0px #000000",
                    fontFamily: "Impact, Montserrat, sans-serif"
                }}
                className="text-6xl font-black italic text-yellow-400 uppercase text-center max-w-[80%]"
            >
                {activePage.text}
            </div>
        </AbsoluteFill>
    );
};