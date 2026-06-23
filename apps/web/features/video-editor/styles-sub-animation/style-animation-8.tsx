import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import { SUBTITLE_CLASS } from "./WordSubtitleEngine";

export default function Animation8({ currentWords, frame, fps }: AnimationProps) {
    const words = currentWords?.text.split(" ") ?? [];
    const wordstartFrame = currentWords ? (currentWords?.startMs / 1000) * fps : 0
    const wordEndFrame = currentWords ? wordstartFrame + (currentWords?.durationMs / 1000) * fps : 0
    const layerLength = wordEndFrame - wordstartFrame
    const fortyPercentOfLayer = layerLength * 0.4
    const middleFrame = wordstartFrame + fortyPercentOfLayer
    const isLongText = words.length > 3;
    const middle = Math.ceil(words.length / 2);
    const firstLineWords = words.slice(0, middle).join(" ");
    const secondLineWords = words.slice(middle).join(" ");
    const completwords = words.join(" ");

    const scale = interpolate(
        frame,
        [wordstartFrame, middleFrame],
        [0.95, 1.1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    )

    const boxStyle = `${SUBTITLE_CLASS} text-black p-4 text-center bg-white`;

    return (
        <div className="flex flex-col gap-1">
            {isLongText ? (
                <div className="flex flex-col gap-1 flex-wrap max-w-3xl justify-center items-center">
                    <div className={boxStyle} style={{ transform: `scale(${scale})` }}>{firstLineWords}</div>
                    <div className={boxStyle} style={{ transform: `scale(${scale})` }}>{secondLineWords}</div>
                </div>
            ) : (
                <div className={boxStyle} style={{ transform: `scale(${scale})` }}>{completwords}</div>
            )}
        </div>
    );
}
