import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Cinematic Tracking — lettre-espacement qui s'élargit sur le mot actif
function getCinematicTrackingStyle({
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
    const middleFrame = tokenStartFrame + layerLength * 0.5;

    const letterSpacing = isCurrentToken
        ? `${interpolate(frame, [tokenStartFrame, middleFrame], [0, 6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })}px`
        : "0px";

    return {
        opacity: isCurrentToken ? 1.0 : 0.4,
        letterSpacing,
        textShadow: "0 4px 8px rgba(0,0,0,0.7)",
    };
}

export default function Animation14(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getCinematicTrackingStyle} />;
}
