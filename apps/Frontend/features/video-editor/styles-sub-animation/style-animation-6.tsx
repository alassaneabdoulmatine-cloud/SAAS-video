import { interpolate } from "remotion";
import { AnimationProps } from "../types/animation-props-type";
import { useTextStylePropertiesStore } from "../store/text-style-properties-store";

export default function animation6({ currentWords, frame, fps }: AnimationProps) {

    const wordStartFrame = currentWords ? (currentWords.startMs / 1000) * fps : 0;
    const wordEndFrame = currentWords ? wordStartFrame + (currentWords.durationMs / 1000) * fps : 0;
    const layerLength = currentWords ? wordEndFrame - wordStartFrame : 0;
    const fortyPercentOfLayer = layerLength * 0.4;
    const middleFrame = wordStartFrame + fortyPercentOfLayer;

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
            <div style={{
                ...dynamicStyle,
                transform: `scale(${scale})`
            }}>{currentWords?.text}</div>
        </div>
    );
}
