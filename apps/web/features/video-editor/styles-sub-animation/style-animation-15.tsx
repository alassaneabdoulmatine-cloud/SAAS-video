import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./share-component/WordSubtitleEngine";

// Dark Box Highlight — boîte sombre transparente avec texte jaune sur le mot actif
function getDarkBoxHighlightStyle({
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
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0.95, 1.08], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
        : 1.0;

    return {
        color: isCurrentToken ? "#FACC15" : "rgba(255, 255, 255, 0.7)",
        backgroundColor: isCurrentToken ? "rgba(0, 0, 0, 0.75)" : "transparent",
        padding: isCurrentToken ? "2px 8px" : "2px 0px",
        borderRadius: "6px",
        transform: `scale(${scale})`,
        transition: "background-color 0.15s, color 0.15s, padding 0.15s",
        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
    };
}

export default function Animation15(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getDarkBoxHighlightStyle} />;
}
