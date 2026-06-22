import { AnimationProps } from "../types/animation-props-type";
import { SUBTITLE_CLASS } from "./WordSubtitleEngine";

export default function animation3({ currentWords }: AnimationProps) {
    const words = currentWords?.text.split(" ") ?? [];
    const isLongText = words.length > 3;
    const middle = Math.ceil(words.length / 2);
    const firstLineWords = words.slice(0, middle).join(" ");
    const secondLineWords = words.slice(middle).join(" ");
    const completwords = words.join(" ");

    const boxStyle = `${SUBTITLE_CLASS} text-black p-4 text-center bg-white`;

    return (
        <div className="flex flex-col gap-1">
            {isLongText ? (
                <div className="flex flex-col gap-1 flex-wrap max-w-3xl justify-center items-center">
                    <div className={boxStyle}>{firstLineWords}</div>
                    <div className={boxStyle}>{secondLineWords}</div>
                </div>
            ) : (
                <div className={boxStyle}>{completwords}</div>
            )}
        </div>
    );
}
