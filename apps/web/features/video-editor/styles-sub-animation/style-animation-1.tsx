import { CSSProperties } from "react";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Only Show Active — seul le mot actif est visible
function getOnlyActiveStyle({
    isCurrentToken,
}: {
    frame: number;
    fps: number;
    tokenStartFrame: number;
    tokenEndFrame: number;
    isCurrentToken: boolean;
    layerLength: number;
}): CSSProperties {
    return {
        display: isCurrentToken ? "inline-block" : "none",
    };
}

export default function Animation1(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getOnlyActiveStyle} />;
}
