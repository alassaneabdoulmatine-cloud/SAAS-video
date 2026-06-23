import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Slide Up Fade — chaque mot slide du bas avec fade-in
function getSlideUpFadeStyle({
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

    const translateY = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 0;

    const opacity = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 0.3;

    return {
        opacity,
        transform: `translateY(${translateY}px)`,
        textShadow: "0 2px 6px rgba(0,0,0,0.5)",
    };
}

export default function Animation9(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getSlideUpFadeStyle} />;
}
