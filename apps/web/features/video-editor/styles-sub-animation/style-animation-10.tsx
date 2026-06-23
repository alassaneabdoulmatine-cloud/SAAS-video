import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import { SUBTITLE_CLASS } from "./WordSubtitleEngine";

export default function Animation10({ currentWords, frame, fps }: AnimationProps) {
    const wordstartFrame = currentWords ? (currentWords?.startMs / 1000) * fps : 0
    const wordEndFrame = currentWords ? wordstartFrame + (currentWords?.durationMs / 1000) * fps : 0
    const layerLength = wordEndFrame - wordstartFrame
    const fortyPercentOfLayer = layerLength * 0.4
    const middleFrame = wordstartFrame + fortyPercentOfLayer

    const scale = interpolate(
        frame,
        [wordstartFrame, middleFrame],
        [0.90, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    )

    return (
        <div className="flex flex-col gap-1">
            <div className={`${SUBTITLE_CLASS} text-white`} style={{ transform: `scale(${scale})` }}>{currentWords?.text}</div>
        </div>
    );
}
