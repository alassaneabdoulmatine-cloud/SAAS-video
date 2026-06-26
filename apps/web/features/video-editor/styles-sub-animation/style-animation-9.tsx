import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import { SUBTITLE_CLASS } from "./share-component/WordSubtitleEngine";

export default function animation9({ currentWords, frame, fps }: AnimationProps) {
    const words = currentWords?.text.split(" ") ?? [];
    const wordstartFrame = currentWords ? (currentWords?.startMs / 1000) * fps : 0
    const wordEndFrame = currentWords ? wordstartFrame + (currentWords?.durationMs / 1000) * fps : 0
    const layerLength = wordEndFrame - wordstartFrame
    const fortyPercentOfLayer = layerLength * 0.1
    const middleFrame = wordstartFrame + fortyPercentOfLayer
    const isLongText = words.length > 3;
    const middle = Math.ceil(words.length / 2);
    const firstLineWords = words.slice(0, middle).join(" ");
    const secondLineWords = words.slice(middle).join(" ");
    const completwords = words.join(" ");

    const scale = interpolate(
        frame,
        [wordstartFrame, middleFrame],
        [0.95, 1],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    )



    return (
        <div className="flex flex-col gap-1">
            {isLongText ? (
                <div className="flex flex-col  flex-wrap max-w-3xl justify-center items-center">
                    <div className={`${SUBTITLE_CLASS} text-black p-4 text-center bg-white rounded-sm`} style={{ transform: `scale(${scale})` }}>{firstLineWords}</div>
                    <div className={`${SUBTITLE_CLASS} text-black p-4 text-center bg-[#13FD00] rounded-sm`}
                        style={{
                            transform: `scale(${scale})`, rotate: "-0.5deg"
                        }}>
                        {secondLineWords}
                    </div>
                </div>
            ) : (
                <div className={`${SUBTITLE_CLASS} text-black p-4 text-center bg-white`} style={{ transform: `scale(${scale})` }}>{completwords}</div>
            )}
        </div>
    );
}
