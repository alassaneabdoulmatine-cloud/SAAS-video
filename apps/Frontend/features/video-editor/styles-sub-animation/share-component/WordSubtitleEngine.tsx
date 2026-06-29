// import React from "react";
// import { AnimationProps } from "../../types/animation-props-type";
// import { useTextStylePropertiesStore } from "../../store/text-style-properties-store";

// // Centralized typography styles. Changing this changes text size/styling in all animations!
// export const SUBTITLE_CLASS = "text-6xl font-bold uppercase";

// interface EngineProps extends AnimationProps {
//     getStyle: (params: {
//         frame: number;
//         fps: number;
//         tokenStartFrame: number;
//         tokenEndFrame: number;
//         isCurrentToken: boolean;
//         layerLength: number;
//     }) => React.CSSProperties;
// }

// export default function WordSubtitleEngine({ currentToken, currentWords, fps, frame, getStyle }: EngineProps) {
//     return (
//         <div className={`flex flex-row flex-wrap items-center justify-center text-center max-w-[90%] text-white ${SUBTITLE_CLASS}`}>
//             {currentWords?.tokens.map((token, index) => {
//                 const tokenStartFrame = (token.fromMs / 1000) * fps;
//                 const tokenEndFrame = (token.toMs / 1000) * fps;
//                 const layerLength = tokenEndFrame - tokenStartFrame;
//                 const isCurrentToken = !!(currentToken && token.fromMs === currentToken.fromMs);
//                 const { fontFamily, fontSize, styles, casing, color, letterSpacing, lineHeight, alignment } = useTextStylePropertiesStore();

//                 // 🛠️ CONSTRUCTION DU STYLE EN LIGNE AVEC ZUSTAND
//                 const dynamicStyle: React.CSSProperties = {
//                     fontFamily: fontFamily,
//                     fontSize: `${fontSize}px`,
//                     color: color,
//                     letterSpacing: `${letterSpacing}px`,

//                     // Gestion des motifs (bold, italic, underline)
//                     fontWeight: styles.includes("bold") ? "bold" : "normal",
//                     fontStyle: styles.includes("italic") ? "italic" : "normal",
//                     textDecoration: styles.includes("underline") ? "underline" : "none",

//                     // Gestion de la casse
//                     textTransform: casing as any,
//                 };

//                 const animatedStyle = getStyle({
//                     frame,
//                     fps,
//                     tokenStartFrame,
//                     tokenEndFrame,
//                     isCurrentToken,
//                     layerLength
//                 });

//                 const style = {
//                     ...animatedStyle,
//                     ...dynamicStyle,
//                 };
//                 console.log("style", style);

//                 return (
//                     <span
//                         key={`${token.text}-${index}`}
//                         style={style}
//                     >
//                         {token.text}
//                     </span>
//                 );
//             })}
//         </div>
//     );
// }



import React from "react";
import { AnimationProps } from "../../types/animation-props-type";
import { useTextStylePropertiesStore } from "../../store/text-style-properties-store";

interface EngineProps extends AnimationProps {
    getStyle: (params: {
        frame: number;
        fps: number;
        tokenStartFrame: number;
        tokenEndFrame: number;
        isCurrentToken: boolean;
        layerLength: number;
    }) => React.CSSProperties;
}

export default function WordSubtitleEngine({ currentToken, currentWords, fps, frame, getStyle }: EngineProps) {
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
        <div
            className="flex flex-row flex-wrap items-center justify-center text-center max-w-[90%]"
        >
            {currentWords?.tokens.map((token, index) => {
                const tokenStartFrame = (token.fromMs / 1000) * fps;
                const tokenEndFrame = (token.toMs / 1000) * fps;
                const layerLength = Math.max(0, tokenEndFrame - tokenStartFrame);
                const isCurrentToken = currentToken?.fromMs === token.fromMs && currentToken?.toMs === token.toMs;

                const animatedStyle = getStyle({
                    frame,
                    fps,
                    tokenStartFrame,
                    tokenEndFrame,
                    isCurrentToken,
                    layerLength,
                });

                return (
                    <span
                        key={`${token.text}-${token.fromMs}-${index}`}
                        style={{
                            ...dynamicStyle,
                            ...animatedStyle,
                        }}
                    >
                        {token.text}
                    </span>
                );
            })}
        </div>
    );
}