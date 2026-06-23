import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Neon Cyan Glow — mot actif en cyan avec halo lumineux
function getGlowNeonStyle({
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
        color: isCurrentToken ? "#06B6D4" : "#FFFFFF",
        transform: `scale(${scale})`,
        textShadow: isCurrentToken
            ? "0 0 8px #06B6D4, 0 0 15px rgba(6, 182, 212, 0.6), 0 2px 4px rgba(0,0,0,0.9)"
            : "0 2px 4px rgba(0,0,0,0.6)",
    };
}

export default function Animation10(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getGlowNeonStyle} />;
}
