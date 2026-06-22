import { interpolate } from "remotion";
import { CSSProperties } from "react";

export interface StyleCalculatorProps {
    frame: number;
    fps: number;
    tokenStartFrame: number;
    tokenEndFrame: number;
    isCurrentToken: boolean;
    layerLength: number;
}

// Animation 1 formula: Only show the active token
export const applyOnlyActive = ({ isCurrentToken }: StyleCalculatorProps): CSSProperties => {
    return {
        display: isCurrentToken ? "inline-block" : "none",
    };
};

// Animation 2 formula: Highlight active token in yellow, other tokens in white
export const applyHighlight = ({ isCurrentToken }: StyleCalculatorProps): CSSProperties => {
    return {
        color: isCurrentToken ? "#EAB308" : "#FFFFFF",
    };
};

// Animation 4 formula: Fade in opacity based on start frame
export const applyOpacityFade = ({ frame, tokenStartFrame, tokenEndFrame, layerLength }: StyleCalculatorProps): CSSProperties => {
    const fortyPercentOfLayer = layerLength * 0.4;
    const middleFrame = tokenStartFrame + fortyPercentOfLayer;

    const opacity = interpolate(
        frame,
        [tokenStartFrame, middleFrame],
        [0, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return {
        opacity,
    };
};
