import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Skew Dynamic — inclinaison italique + montée sur le mot actif en vert
function getSkewDynamicStyle({
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

    const skewX = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0, -12], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 0;

    const translateY = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0, -8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 0;

    const scale = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [1.0, 1.12], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 1.0;

    return {
        color: isCurrentToken ? "#10B981" : "#FFFFFF",
        transform: `scale(${scale}) skewX(${skewX}deg) translateY(${translateY}px)`,
        textShadow: "0 4px 6px rgba(0,0,0,0.6)",
    };
}

export default function Animation16(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getSkewDynamicStyle} />;
}
