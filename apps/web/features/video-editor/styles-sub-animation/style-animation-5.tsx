import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Opacity Fade + Slide Up — fade-in avec montée depuis le bas
function getOpacityFadeAndPositionUpStyle({
    frame,
    tokenStartFrame,
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

    const opacity = interpolate(
        frame,
        [tokenStartFrame, middleFrame],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const translateY = interpolate(
        frame,
        [tokenStartFrame, middleFrame],
        [40, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return {
        opacity,
        transform: `translateY(${translateY}px)`,
    };
}

export default function Animation5(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getOpacityFadeAndPositionUpStyle} />;
}
