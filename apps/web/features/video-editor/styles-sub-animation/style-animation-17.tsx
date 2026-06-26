import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./share-component/WordSubtitleEngine";

// Outline Highlight — contour noir épais + rouge vif sur le mot actif
function getOutlineHighlightStyle({
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
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0.95, 1.12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
        : 1.0;

    return {
        color: isCurrentToken ? "#EF4444" : "#FFFFFF",
        transform: `scale(${scale})`,
        textShadow:
            "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 6px rgba(0,0,0,0.7)",
    };
}

export default function Animation17(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getOutlineHighlightStyle} />;
}
