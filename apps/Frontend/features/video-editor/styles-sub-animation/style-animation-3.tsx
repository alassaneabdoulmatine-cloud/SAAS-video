import { useTextStylePropertiesStore } from "../store/text-style-properties-store";
import { AnimationProps } from "../types/animation-props-type";


export default function animation3({ currentWords }: AnimationProps) {
    const words = currentWords?.text.split(" ") ?? [];
    const isLongText = words.length > 3;
    const middle = Math.ceil(words.length / 2);
    const firstLineWords = words.slice(0, middle).join(" ");
    const secondLineWords = words.slice(middle).join(" ");
    const completwords = words.join(" ");

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
                    <div style={dynamicStyle}>{firstLineWords}</div>
                    <div style={dynamicStyle}>{secondLineWords}</div>
                </div>
            ) : (
                <div style={dynamicStyle}>{completwords}</div>
            )}
        </div>
    );
}
