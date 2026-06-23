import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import { SUBTITLE_CLASS } from "./WordSubtitleEngine";

export default function animation6({ currentWords, frame, fps }: AnimationProps) {

    const wordStartFrame = currentWords ? (currentWords.startMs / 1000) * fps : 0;
    const wordEndFrame = currentWords ? wordStartFrame + (currentWords.durationMs / 1000) * fps : 0;
    const layerLength = currentWords ? wordEndFrame - wordStartFrame : 0;
    const fortyPercentOfLayer = layerLength * 0.4;
    const middleFrame = wordStartFrame + fortyPercentOfLayer;


    const boxStyle = `${SUBTITLE_CLASS} text-white`;

    const scale = interpolate(
        frame,
        [wordStartFrame, middleFrame],
        [0.6, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    )

    return (
        <div className="flex flex-col gap-1">
            <div className={boxStyle} style={{
                transform: `scale(${scale})`
            }}>{currentWords?.text}</div>
        </div>
    );
}
