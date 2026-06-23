import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Rotational Tilt — rotation légère + scale sur le mot actif en violet
function getRotationalTiltStyle({
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

    const rotate = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [-8, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 0;

    const scale = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0.85, 1.1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 1.0;

    return {
        color: isCurrentToken ? "#C084FC" : "#FFFFFF",
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        textShadow: "0 3px 6px rgba(0,0,0,0.5)",
    };
}

export default function Animation13(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getRotationalTiltStyle} />;
}
