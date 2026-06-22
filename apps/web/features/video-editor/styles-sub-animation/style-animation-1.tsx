import { TikTokPage, TikTokToken } from "@remotion/captions";
import { AnimationProps } from "../types/animation-props-type";


export default function animation1({ currentToken, currentWords, fps, frame, currentMs }: AnimationProps) {
    return (
        <div className="flex flex-row flex-wrap items-center justify-center text-center max-w-[90%] text-6xl font-bold text-white uppercase">
            {currentToken?.text}
        </div>
    )
}
