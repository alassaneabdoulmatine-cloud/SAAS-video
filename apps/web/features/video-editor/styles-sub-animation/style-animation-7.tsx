import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Pill Highlight — mot actif en bulle bleue style CapCut

type StyleProps = {
    frame: number;
    fps: number;
    tokenStartFrame: number;
    tokenEndFrame: number;
    isCurrentToken: boolean;
    layerLength: number;
}
function getPillHighlightStyle({ frame, tokenStartFrame, isCurrentToken, layerLength }: StyleProps): CSSProperties {
    const middleFrame = tokenStartFrame + layerLength * 0.4;
    const scale = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0.9, 1.05], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
        : 1.0;

    return {
        backgroundColor: isCurrentToken ? "#3B82F6" : "transparent",
        padding: isCurrentToken ? "12px" : "",
        borderRadius: "20px",
        transform: `scale(${scale})`,
        transition: "background-color 0.15s ease, color 0.15s ease, padding 0.15s ease",
    };
}

export default function Animation7(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getPillHighlightStyle} />;
}
