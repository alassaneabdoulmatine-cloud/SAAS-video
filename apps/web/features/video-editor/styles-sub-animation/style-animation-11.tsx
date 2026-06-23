import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Elastic Bounce — rebond spring sur le mot actif
function getBounceElasticStyle({
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
    if (!isCurrentToken) {
        return {
            opacity: 0.6,
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        };
    }

    const progress = frame - tokenStartFrame;
    const d = layerLength;

    const scale = interpolate(
        progress,
        [0, d * 0.2, d * 0.4, d * 0.6, d * 0.8],
        [0.8, 1.25, 0.92, 1.05, 1.0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return {
        transform: `scale(${scale})`,
        color: "#F8FAFC",
        textShadow: "0 4px 8px rgba(0,0,0,0.6), 0 0 4px rgba(255,255,255,0.2)",
    };
}

export default function Animation11(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getBounceElasticStyle} />;
}
