import { CSSProperties } from "react";
import { Easing, interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./share-component/WordSubtitleEngine";

// Opacity Fade — fade-in avec easing cubic sur chaque token
function getOpacityFadeStyle({
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
        {
            easing: Easing.bezier(0.71, -0.02, 0.46, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return { opacity };
}

export default function Animation4(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getOpacityFadeStyle} />;
}
