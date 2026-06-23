import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Pill Highlight — mot actif en bulle bleue style CapCut
function getPillHighlightStyle({
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
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0.9, 1.05], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 1.0;

    return {
        color: isCurrentToken ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)",
        backgroundColor: isCurrentToken ? "#3B82F6" : "transparent",
        padding: isCurrentToken ? "4px 12px" : "4px 0px",
        borderRadius: "9999px",
        transform: `scale(${scale})`,
        transition: "background-color 0.15s ease, color 0.15s ease, padding 0.15s ease",
        textShadow: isCurrentToken ? "0 2px 4px rgba(0,0,0,0.4)" : "none",
    };
}

export default function Animation7(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getPillHighlightStyle} />;
}
