import React from "react";
import { AnimationProps } from "../../types/animation-props-type";

// Centralized typography styles. Changing this changes text size/styling in all animations!
export const SUBTITLE_CLASS = "text-6xl font-bold uppercase";

interface EngineProps extends AnimationProps {
    getStyle: (params: {
        frame: number;
        fps: number;
        tokenStartFrame: number;
        tokenEndFrame: number;
        isCurrentToken: boolean;
        layerLength: number;
    }) => React.CSSProperties;
}

export default function WordSubtitleEngine({ currentToken, currentWords, fps, frame, getStyle }: EngineProps) {
    return (
        <div className={`flex flex-row flex-wrap items-center justify-center text-center max-w-[90%] text-white ${SUBTITLE_CLASS}`}>
            {currentWords?.tokens.map((token, index) => {
                const tokenStartFrame = (token.fromMs / 1000) * fps;
                const tokenEndFrame = (token.toMs / 1000) * fps;
                const layerLength = tokenEndFrame - tokenStartFrame;
                const isCurrentToken = !!(currentToken && token.fromMs === currentToken.fromMs);

                const animatedStyle = getStyle({
                    frame,
                    fps,
                    tokenStartFrame,
                    tokenEndFrame,
                    isCurrentToken,
                    layerLength
                });

                return (
                    <span
                        key={`${token.text}-${index}`}
                        className="ml-4 inline-block"
                        style={animatedStyle}
                    >
                        {token.text}
                    </span>
                );
            })}
        </div>
    );
}
