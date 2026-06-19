import { interpolate, spring } from 'remotion';

// Les types partagés par tous nos composants de mots
type AnimatedTokenProps = {
    text: string;
    isActive: boolean;
    frame: number;
    fps: number;
    fromMs: number;
};

// 🟢 STYLE 1 : Le Classique Karaoké Vert
export const KaraokeGreenToken = ({ text, isActive }: AnimatedTokenProps) => {
    return (
        <div
            style={{
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                backgroundColor: isActive ? "green" : "transparent",
            }}
        >
            <span className="text-white text-7xl font-bold font-impact tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                {text.toUpperCase()}
            </span>
        </div>
    );
};

// 🟡 STYLE 2 : Le Pop Zoom (Effet ressort Spring de Remotion)
export const PopZoomToken = ({ text, isActive, frame, fps, fromMs }: AnimatedTokenProps) => {
    const tokenStartFrame = (fromMs / 1000) * fps;
    const framesDepuisLeDebut = frame - tokenStartFrame;

    const animationSpring = spring({
        frame: framesDepuisLeDebut,
        fps,
        config: { damping: 12, mass: 0.5 },
    });

    const scale = isActive ? interpolate(animationSpring, [0, 1], [1, 1.25]) : 1;

    return (
        <div
            style={{
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                transform: `scale(${scale})`,
                backgroundColor: isActive ? "#FFFF00" : "transparent", // Fond jaune si actif
            }}
        >
            <span className={`text-7xl font-bold font-impact tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] ${isActive ? 'text-black' : 'text-white'}`}>
                {text.toUpperCase()}
            </span>
        </div>
    );
};

// 🔵 STYLE 3 : Le Minimal Fade (Interpolation de l'opacité)
export const MinimalFadeToken = ({ text, isActive, frame, fps, fromMs }: AnimatedTokenProps) => {
    const tokenStartFrame = (fromMs / 1000) * fps;
    const framesDepuisLeDebut = frame - tokenStartFrame;

    const opaciteProgressive = interpolate(
        framesDepuisLeDebut,
        [0, 3], // Transition fluide calculée mathématiquement sur 3 frames
        [0.4, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return (
        <div
            style={{
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                opacity: isActive ? opaciteProgressive : 0.4,
            }}
        >
            <span className="text-white text-7xl font-bold font-impact tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                {text.toUpperCase()}
            </span>
        </div>
    );
};