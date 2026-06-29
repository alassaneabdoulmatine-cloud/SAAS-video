import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine from "./share-component/WordSubtitleEngine";

// Yellow Underline Slide — soulignement jaune animé sur le mot actif
function getUnderlineSlideStyle({
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

    const borderBottomWidth = isCurrentToken
        ? interpolate(frame, [tokenStartFrame, middleFrame], [0, 4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        })
        : 0;

    return {
        color: isCurrentToken ? "#FACC15" : "#FFFFFF",
        borderBottom: isCurrentToken ? `${borderBottomWidth}px solid #FACC15` : "none",
        paddingBottom: isCurrentToken ? "2px" : "0px",
        textShadow: "0 2px 4px rgba(0,0,0,0.6)",
    };
}

export default function Animation12(props: AnimationProps) {
    return <WordSubtitleEngine {...props} getStyle={getUnderlineSlideStyle} />;
}
