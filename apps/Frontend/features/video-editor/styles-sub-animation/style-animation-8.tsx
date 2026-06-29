import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import { useTextStylePropertiesStore } from "../store/text-style-properties-store";

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

    const { fontFamily, fontSize, styles, casing, color, letterSpacing, lineHeight, alignment } = useTextStylePropertiesStore();

    const dynamicStyle: React.CSSProperties = {
        fontFamily,
        fontSize,
        color,
        letterSpacing,
        lineHeight,
        textAlign: alignment as React.CSSProperties["textAlign"],

        fontWeight: styles.includes("bold") ? "bold" : "normal",
        fontStyle: styles.includes("italic") ? "italic" : "normal",
        textDecoration: styles.includes("underline") ? "underline" : "none",

        textTransform: casing as React.CSSProperties["textTransform"],
    };

    return (
        <div className="flex flex-col gap-1">
            {isLongText ? (
                <div className="flex flex-col gap-1 flex-wrap max-w-3xl justify-center items-center">
                    <div style={{ ...dynamicStyle, transform: `scale(${scale})` }}>{firstLineWords}</div>
                    <div style={{ ...dynamicStyle, transform: `scale(${scale})` }}>{secondLineWords}</div>
                </div>
            ) : (
                <div style={{ ...dynamicStyle, transform: `scale(${scale})` }}>{completwords}</div>
            )}
        </div>
    );
}
