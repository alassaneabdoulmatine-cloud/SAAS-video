
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from '@remotion/media';
import { Caption, createTikTokStyleCaptions } from "@remotion/captions";
import { ClassicHighlightToken } from "./style-animation";
import { useStyleVariantStore } from "../store/style-variant-store";

type MyVideoCompositionProps = {
    videoSrc: string;
    subtitles: Caption[];
};

export const MyVideoComposition = ({ videoSrc, subtitles }: MyVideoCompositionProps) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const currentMs = (frame / fps) * 1000;

    const subtitlewithspace = subtitles.map((subtitle, index) => {
        return {
            ...subtitle,
            text: index === 0 ? subtitle.text : " " + subtitle.text,
        };
    });

    const { pages } = createTikTokStyleCaptions({
        captions: subtitlewithspace,
        combineTokensWithinMilliseconds: 400,
    });

    const currentWords = pages.find(page => {
        if (!page) return null;
        return currentMs >= page.startMs && currentMs <= page.startMs + page.durationMs;
    });

    const currenttoken = currentWords?.tokens.find(token => {
        return currentMs >= token.fromMs && currentMs <= token.toMs;
    });

    //  Sélection dynamique du composant de style 
    const { stylevariant } = useStyleVariantStore();
    const DynamicTokenComponent = stylevariant || ClassicHighlightToken;

    return (
        <AbsoluteFill>
            {/* Calque 1 : La vidéo de fond */}
            <AbsoluteFill>
                <Video src={videoSrc} className="w-full h-full object-contain" />
            </AbsoluteFill>

            {/* Calque 2 : Les sous-titres superposés */}
            <AbsoluteFill className="flex items-center justify-center pt-[300px]">
                {currentWords && (
                    <div className="flex flex-row flex-wrap items-center justify-center text-center max-w-[90%] whitespace-pre">
                        {currentWords.tokens.map((token, index) => {
                            const isCurrentActiveToken = token.text.toUpperCase() === currenttoken?.text.toUpperCase();

                            // Rendu du composant dynamique avec injection des données temporelles Remotion
                            return (
                                <DynamicTokenComponent
                                    key={index}
                                    text={token.text}
                                    isActive={isCurrentActiveToken}
                                    frame={frame}
                                    fps={fps}
                                    fromMs={token.fromMs}
                                />
                            );
                        })}
                    </div>
                )}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};





