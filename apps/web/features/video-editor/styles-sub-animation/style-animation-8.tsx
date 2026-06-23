import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Blur Focus — inactive floutés, actif net avec ombre
function getBlurFocusStyle({
    frame,
    tokenStartFrame,
    isCurrentToken,
    layerLength,
}: {
    frame: number;
    fps: number;
    tokenStartFrame: number;
    tokenEndFrame: number;
    isCurrentToken: boolean;
    layerLength: number;
}): CSSProperties {
    const middleFrame = tokenStartFrame + layerLength * 0.4;
    const scale = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0.95, 1.1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 0.95;

    return {
        filter: isCurrentToken ? "none" : "blur(3px)",
        opacity: isCurrentToken ? 1.0 : 0.4,
        transform: `scale(${scale})`,
        transition: "filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
        textShadow: isCurrentToken ? "0 4px 12px rgba(0,0,0,0.6)" : "none",
    };
}

export default function Animation8(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getBlurFocusStyle} />;
}
