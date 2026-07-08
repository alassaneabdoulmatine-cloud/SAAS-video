import React from "react";
import { AnimationProps } from "../../types/animation-props-type";
import { useTextStylePropertiesStore } from "../../store/text-style-properties-store";
import { useGeneralSubtitleSettingsStore } from "../../store/general-subtitle-settings-store";

type FullTextEngineProps = AnimationProps & {
    splitLines?: boolean;
    getStyle?: (params: {
        frame: number;
        fps: number;
        wordStartFrame: number;
        wordEndFrame: number;
        layerLength: number;
    }) => React.CSSProperties;
};

// Contour parfait à 360° via multi-shadow
function createTextStrokeShadow(thickness: number, color: string): string {
    if (thickness <= 0) return "none";
    const shadows = [];
    const totalSteps = 16;
    for (let i = 0; i < totalSteps; i++) {
        const angle = (i * 2 * Math.PI) / totalSteps;
        const x = (Math.cos(angle) * thickness).toFixed(2);
        const y = (Math.sin(angle) * thickness).toFixed(2);
        shadows.push(`${x}px ${y}px 0px ${color}`);
    }
    return shadows.join(", ");
}

// Hex + opacité → RGBA
function hexToRgba(hex: string, opacity: number): string {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    const r = parseInt(c.substring(0, 2), 16);
    const g = parseInt(c.substring(2, 4), 16);
    const b = parseInt(c.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

export default function FullTextSubtitleEngine({
    currentToken,
    currentWords,
    fps,
    frame,
    currentMs,
    splitLines = false,
    getStyle,
}: FullTextEngineProps) {
    const {
        fontFamily,
        fontSize,
        styles,
        casing,
        color,
        letterSpacing,
        lineHeight,
        alignment,
        strokeEnabled,
        strokeThickness,
        strokeColor,
        shadowEnabled,
        shadowColor,
        shadowOpacity,
        shadowBlur,
        shadowDistance,
        shadowAngle,
        fontWeight
    } = useTextStylePropertiesStore();

    // Paramètres généraux des sous-titres
    const { wordPerLine, borderRadius, posX, posY } = useGeneralSubtitleSettingsStore();

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
        fontWeight: styles.includes("bold") ? "bold" : (fontWeight as any),
        fontStyle: styles.includes("italic") ? "italic" : "normal",
        textDecoration: styles.includes("underline") ? "underline" : "none",
        textTransform: casing as React.CSSProperties["textTransform"],
        wordBreak: "break-word",
        overflowWrap: "break-word",
        whiteSpace: "normal",
        borderRadius: `${borderRadius}em`,
        textShadow: textShadowParts.length > 0 ? textShadowParts.join(", ") : "none",
    };

    const wordsPerLine = parseInt(wordPerLine, 10) || 4;

    const wordStartFrame = currentWords ? (currentWords.startMs / 1000) * fps : 0;
    const wordEndFrame = currentWords ? wordStartFrame + (currentWords.durationMs / 1000) * fps : 0;
    const layerLength = Math.max(0, wordEndFrame - wordStartFrame);

    const animatedStyle = getStyle
        ? getStyle({
              frame,
              fps,
              wordStartFrame,
              wordEndFrame,
              layerLength,
          })
        : {};

    const text = currentWords?.text ?? "";
    const words = text.split(" ");
    
    // Découpe le texte en lignes selon wordPerLine pour assurer le retour à la ligne
    const lines: string[] = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
        lines.push(words.slice(i, i + wordsPerLine).join(" "));
    }

    const renderContent = () => {
        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "center" }}>
                {lines.map((lineText, index) => (
                    <div key={index} style={{ ...dynamicStyle, ...animatedStyle }}>
                        {lineText}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div
            style={{
                position: "absolute",
                left: `${posX}%`,
                top: `${posY}%`,
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "max-content",
                maxWidth: "95%",
            }}
        >
            {renderContent()}
        </div>
    );
}

