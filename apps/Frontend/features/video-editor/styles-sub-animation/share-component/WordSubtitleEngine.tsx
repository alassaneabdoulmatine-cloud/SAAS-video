
// import React from "react";
// import { AnimationProps } from "../../types/animation-props-type";
// import { useTextStylePropertiesStore } from "../../store/text-style-properties-store";

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
//     const { fontFamily, fontSize, styles, casing, color, letterSpacing, lineHeight, alignment, strokeEnabled, strokeThickness, strokeColor } = useTextStylePropertiesStore();

//     const strockthicknessformat = strokeThickness * 0.1;

//     const dynamicStyle: React.CSSProperties = {
//         fontFamily,
//         fontSize,
//         color,
//         letterSpacing,
//         lineHeight,
//         textAlign: alignment as React.CSSProperties["textAlign"],

//         fontWeight: styles.includes("bold") ? "bold" : "normal",
//         fontStyle: styles.includes("italic") ? "italic" : "normal",
//         textDecoration: styles.includes("underline") ? "underline" : "none",

//         textTransform: casing as React.CSSProperties["textTransform"],

//         WebkitTextStroke: strokeEnabled ? `${strockthicknessformat}px ${strokeColor}` : "none",
//     };

//     return (
//         <div
//             className="flex flex-row flex-wrap items-center justify-center text-center max-w-[90%]"
//         >
//             {currentWords?.tokens.map((token, index) => {
//                 const tokenStartFrame = (token.fromMs / 1000) * fps;
//                 const tokenEndFrame = (token.toMs / 1000) * fps;
//                 const layerLength = Math.max(0, tokenEndFrame - tokenStartFrame);
//                 const isCurrentToken = currentToken?.fromMs === token.fromMs && currentToken?.toMs === token.toMs;

//                 const animatedStyle = getStyle({
//                     frame,
//                     fps,
//                     tokenStartFrame,
//                     tokenEndFrame,
//                     isCurrentToken,
//                     layerLength,
//                 });

//                 return (

//                     <span
//                         key={`${token.text}-${token.fromMs}-${index}`}
//                         style={{
//                             ...dynamicStyle,
//                             ...animatedStyle,
//                         }
//                         }
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

type EngineProps = AnimationProps & {
    getStyle: (params: {
        frame: number;
        fps: number;
        tokenStartFrame: number;
        tokenEndFrame: number;
        isCurrentToken: boolean;
        layerLength: number;
    }) => React.CSSProperties;
}

// FONCTION MAGIQUE : Génère un contour parfait à 360° sans écraser le texte
function createTextStrokeShadow(thickness: number, color: string): string {
    if (thickness <= 0) return "none";

    const shadows = [];
    // On dessine 16 ombres directionnelles tout autour de la lettre pour un rendu ultra-lisse
    const totalSteps = 16;

    for (let i = 0; i < totalSteps; i++) {
        const angle = (i * 2 * Math.PI) / totalSteps;
        const x = (Math.cos(angle) * thickness).toFixed(2);
        const y = (Math.sin(angle) * thickness).toFixed(2);
        shadows.push(`${x}px ${y}px 0px ${color}`);
    }

    return shadows.join(", ");
}

// Convertit une couleur Hex et une opacité en RGBA
function hexToRgba(hex: string, opacity: number): string {
    let c = hex.replace("#", "");
    if (c.length === 3) {
        c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

export default function WordSubtitleEngine({ currentToken, currentWords, fps, frame, getStyle }: EngineProps) {
    const {
        fontFamily, fontSize, styles, casing, color, letterSpacing,
        lineHeight, alignment, strokeEnabled, strokeThickness, strokeColor,
        shadowEnabled, shadowColor, shadowOpacity, shadowBlur, shadowDistance, shadowAngle
    } = useTextStylePropertiesStore();

    // On réduit l'échelle du slider pour que les valeurs du curseur restent douces au pixel près
    const strokeThicknessInPx = strokeThickness * 0.1;

    const textShadowParts: string[] = [];

    if (strokeEnabled) {
        textShadowParts.push(createTextStrokeShadow(strokeThicknessInPx, strokeColor));
    }

    if (shadowEnabled) {
        const rad = (shadowAngle * Math.PI) / 180;
        const x = (Math.cos(rad) * shadowDistance).toFixed(2);
        const y = (Math.sin(rad) * shadowDistance).toFixed(2);
        textShadowParts.push(`${x}px ${y}px ${shadowBlur}px ${hexToRgba(shadowColor, shadowOpacity)}`);
    }

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

        textShadow: textShadowParts.length > 0 ? textShadowParts.join(", ") : "none",
    };

    return (
        <div className="flex flex-row flex-wrap items-center justify-center text-center max-w-[90%]">
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
                        className="inline-block mx-1" // Aligne et espace proprement tes tokens
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