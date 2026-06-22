
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from '@remotion/media';
import { Caption, createTikTokStyleCaptions } from "@remotion/captions";
import { useStyleVariantStore } from "../store/style-variant-store";
import animation1 from "../styles-sub-animation/style-animation-1";
import { useCombineTokensWithinMillisecondsStore } from "../store/combine-tokens-within-milliseconds-store";

type MyVideoCompositionProps = {
    videoSrc: string;
    subtitles: Caption[];
};

export const MyVideoComposition = ({ videoSrc, subtitles }: MyVideoCompositionProps) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const { combineTokensWithinMilliseconds } = useCombineTokensWithinMillisecondsStore();
    const currentMs = (frame / fps) * 1000;

    const subtitlewithspace = subtitles.map((subtitle, index) => {
        return {
            ...subtitle,
            text: index === 0 ? subtitle.text : " " + subtitle.text,
        };
    });

    const { pages } = createTikTokStyleCaptions({
        captions: subtitlewithspace,
        combineTokensWithinMilliseconds: combineTokensWithinMilliseconds,
    });

    const currentWords = pages.find(page => {
        if (!page) return null;
        return currentMs >= page.startMs && currentMs <= page.startMs + page.durationMs;
    });

    const currentToken = currentWords?.tokens.find((token) => {
        return (
            currentMs >= token.fromMs && currentMs <= token.toMs
        )
    })

    // //  Sélection dynamique du composant de style 
    const { stylevariant } = useStyleVariantStore();
    const DynamicWordsComponent = stylevariant || animation1;

    return (
        <AbsoluteFill>
            {/* Calque 1 : La vidéo de fond */}
            <AbsoluteFill>
                <Video src={videoSrc} className="w-full h-full object-contain" />
            </AbsoluteFill>

            {/* Calque 2 : Les sous-titres superposés */}
            <AbsoluteFill className="flex items-center justify-center pt-[300px]">
                {currentWords && (
                    <DynamicWordsComponent
                        currentToken={currentToken}
                        currentWords={currentWords}
                        fps={fps}
                        frame={frame}
                        currentMs={currentMs} />
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};





