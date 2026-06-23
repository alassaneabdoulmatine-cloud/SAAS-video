import { CSSProperties } from "react";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./WordSubtitleEngine";

// Highlight — mot actif en jaune, les autres en blanc
function getHighlightStyle({
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
        color: isCurrentToken ? "#EAB308" : "#FFFFFF",
    };
}

export default function Animation2(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getHighlightStyle} />;
}
