import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Gradient Warm Glow — halo ambre + rouge sur le mot actif, comme un feu
function getGradientWarmStyle({
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
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0.95, 1.15], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
          })
        : 1.0;

    return {
        color: isCurrentToken ? "#F59E0B" : "#FFFFFF",
        transform: `scale(${scale})`,
        textShadow: isCurrentToken
            ? "0 0 10px #F59E0B, 0 0 20px #EF4444, 0 2px 4px rgba(0,0,0,0.8)"
            : "0 2px 4px rgba(0,0,0,0.6)",
    };
}

export default function Animation18(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getGradientWarmStyle} />;
}
