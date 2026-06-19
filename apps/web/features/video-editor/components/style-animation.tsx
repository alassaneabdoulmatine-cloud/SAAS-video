import {
    interpolate,
    spring,
    interpolateColors,
} from "remotion";

type AnimatedTokenProps = {
    text: string;
    isActive: boolean;
    frame: number;
    fps: number;
    fromMs: number;
};

// 1. Classic Highlight (Pas d'animation temporelle, juste un switch de couleur)
export const ClassicHighlightToken = ({
    text,
    isActive,
}: AnimatedTokenProps) => {
    return (
        <span
            style={{
                color: isActive ? "#FFD400" : "#FFFFFF",
                fontSize: "4rem",
                fontWeight: "900",
                textTransform: "uppercase",
                textShadow: "0 5px 5px rgba(0,0,0,0.8)",
            }}
        >
            {text}
        </span>
    );
};

// 2. Bounce (Effet ressort ultra-dynamique)
export const BounceToken = ({
    text,
    isActive,
    frame,
    fps,
    fromMs,
}: AnimatedTokenProps) => {
    const tokenStartFrame = (fromMs / 1000) * fps;
    const framesDepuisLeDebut = frame - tokenStartFrame;

    // Configuration de ressort unique : très réactive et élastique (mass: 0.4, damping: 10)
    const bounceProgress = spring({
        frame: framesDepuisLeDebut,
        fps,
        config: {
            damping: 10,
            mass: 0.4,
        },
    });

    const scale = isActive
        ? interpolate(
            bounceProgress,
            [0, 0.4, 0.8, 1],
            [0.8, 1.3, 0.95, 1]
        )
        : 1;

    return (
        <span
            style={{
                display: "inline-block",
                transform: `scale(${scale})`,
                color: isActive ? "#FFD400" : "#FFFFFF",
                fontSize: "4rem",
                fontWeight: "900",
                textTransform: "uppercase",
                textShadow: "0 5px 5px rgba(0,0,0,0.8)",
            }}
        >
            {text}
        </span>
    );
};

// 3. Glow (Néon statique / d'ambiance)
export const GlowToken = ({
    text,
    isActive,
}: AnimatedTokenProps) => {
    return (
        <span
            style={{
                color: "#FFFFFF",
                fontSize: "4rem",
                fontWeight: "900",
                textTransform: "uppercase",
                textShadow: isActive
                    ? `
            0 0 10px #fff,
            0 0 20px #fff,
            0 0 40px #00ff88
          `
                    : "0 5px 5px rgba(0,0,0,0.8)",
            }}
        >
            {text}
        </span>
    );
};

// 4. Slide Up (Animation fluide et lourde vers le haut)
export const SlideUpToken = ({
    text,
    isActive,
    frame,
    fps,
    fromMs,
}: AnimatedTokenProps) => {
    const tokenStartFrame = (fromMs / 1000) * fps;
    const framesDepuisLeDebut = frame - tokenStartFrame;

    // Configuration plus lourde pour donner un effet de glissement fluide (mass: 0.8, damping: 15)
    const slideProgress = spring({
        frame: framesDepuisLeDebut,
        fps,
        config: {
            damping: 15,
            mass: 0.8,
        },
    });

    const translateY = isActive
        ? interpolate(slideProgress, [0, 1], [25, 0], { extrapolateRight: "clamp" })
        : 0;

    return (
        <span
            style={{
                display: "inline-block",
                transform: `translateY(${translateY}px)`,
                color: isActive ? "#FFFFFF" : "#CFCFCF",
                fontSize: "4rem",
                fontWeight: "900",
                textTransform: "uppercase",
                textShadow: "0 5px 5px rgba(0,0,0,0.8)",
            }}
        >
            {text}
        </span>
    );
};

// 5. Glass Pill (Effet de fond vitré sans animation temporelle)
export const GlassPillToken = ({
    text,
    isActive,
}: AnimatedTokenProps) => {
    return (
        <div
            style={{
                display: "inline-flex",
                padding: "0.3rem 1rem",
                borderRadius: "999px",
                background: isActive
                    ? "rgba(255,255,255,0.18)"
                    : "transparent",
                backdropFilter: isActive ? "blur(12px)" : "none",
                border: isActive
                    ? "1px solid rgba(255,255,255,0.25)"
                    : "none",
            }}
        >
            <span
                style={{
                    color: "#FFFFFF",
                    fontSize: "4rem",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    textShadow: "0 5px 5px rgba(0,0,0,0.8)",
                }}
            >
                {text}
            </span>
        </div>
    );
};

// 6. Color Sweep (Transition de couleur douce linéaire)
export const ColorSweepToken = ({
    text,
    isActive,
    frame,
    fps,
    fromMs,
}: AnimatedTokenProps) => {
    const tokenStartFrame = (fromMs / 1000) * fps;
    const framesDepuisLeDebut = frame - tokenStartFrame;

    // Ici on n'utilise pas de ressort, mais une interpolation linéaire sur 4 frames pour un sweep rapide
    const colorProgress = interpolate(
        framesDepuisLeDebut,
        [0, 4],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const color = isActive
        ? interpolateColors(
            colorProgress,
            [0, 1],
            ["#FFFFFF", "#FFD400"]
        )
        : "#FFFFFF";

    return (
        <span
            style={{
                color,
                fontSize: "4rem",
                fontWeight: "900",
                textTransform: "uppercase",
                textShadow: "0 5px 5px rgba(0,0,0,0.8)",
            }}
        >
            {text}
        </span>
    );
};

// 7. Focus Blur (Switch de netteté)
export const FocusBlurToken = ({
    text,
    isActive,
}: AnimatedTokenProps) => {
    return (
        <span
            style={{
                color: "#FFFFFF",
                fontSize: "4rem",
                fontWeight: "900",
                textTransform: "uppercase",
                opacity: isActive ? 1 : 0.6,
                filter: isActive ? "blur(0px)" : "blur(2px)",
                textShadow: "0 5px 5px rgba(0,0,0,0.8)",
            }}
        >
            {text}
        </span>
    );
};