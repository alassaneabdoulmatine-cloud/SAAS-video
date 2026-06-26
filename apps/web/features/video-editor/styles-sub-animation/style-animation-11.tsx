import type { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import WordSubtitleEngine, { SUBTITLE_CLASS } from "./share-component/WordSubtitleEngine";

function getHighlightStyle({
    isCurrentToken,
}: {
    isCurrentToken: boolean;
}): CSSProperties {
    return {
        color: isCurrentToken ? "red" : "black",
    };
}
export default function Animation11(props: AnimationProps) {
    const wordstartFrame = props.currentWords ? (props.currentWords?.startMs / 1000) * props.fps : 0
    const wordEndFrame = props.currentWords ? wordstartFrame + (props.currentWords?.durationMs / 1000) * props.fps : 0
    const layerLength = wordEndFrame - wordstartFrame
    const fortyPercentOfLayer = layerLength * 0.4
    const middleFrame = wordstartFrame + fortyPercentOfLayer


    return (
        <div className="flex flex-col flex-wrap  gap-1">
            <div
                className={`${SUBTITLE_CLASS} text-black bg-white rounded-sm p-4 text-center`}
            >
                <WordSubtitleEngine {...props} getStyle={getHighlightStyle} />
            </div>
        </div>
    );
}
