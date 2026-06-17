
// import { interpolate, spring } from "remotion";

// // Types de styles disponibles
// type SubtitleStyle = 'karaoke-green' | 'pop-zoom' | 'minimal-fade';

// // Notre fonction prend maintenant la "frame" et les "fps" pour calculer les vraies animations Remotion
// export const getThemeConfiguration = (
//     styleType: SubtitleStyle,
//     isActive: boolean,
//     frame: number,
//     fps: number,
//     tokenStartMs: number // On passe le début du mot pour synchroniser l'animation
// ) => {

//     // 1. Configuration par défaut
//     let tokenStyle: React.CSSProperties = {
//         padding: "0.5rem 1rem",
//         borderRadius: "1rem",
//     };
//     let textClassName = "text-7xl font-bold font-impact tracking-wide drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] ";

//     // Convertir le début du token en frames Remotion pour savoir quand démarrer l'animation de ce mot précise
//     const tokenStartFrame = (tokenStartMs / 1000) * fps;
//     const framesDepuisLeDebutDuMot = frame - tokenStartFrame;

//     switch (styleType) {
//         case 'karaoke-green':
//             tokenStyle.backgroundColor = isActive ? "green" : "transparent";
//             textClassName += "text-white";
//             break;

//         case 'pop-zoom':
//             textClassName += isActive ? "text-black" : "text-white";
//             tokenStyle.backgroundColor = isActive ? "#FFFF00" : "transparent";

//             // 🚀 ANIMATION SANS CSS (Méthode Spring de Remotion)
//             // Crée un effet de "ressort/pop" ultra fluide basé uniquement sur les frames
//             const animationSpring = spring({
//                 frame: framesDepuisLeDebutDuMot,
//                 fps,
//                 config: {
//                     damping: 12, // Contrôle le frein de l'effet ressort
//                     mass: 0.5,   // Plus c'est léger, plus ça pop vite
//                 },
//             });

//             // Si le mot est actif, on applique le ressort (va de scale 1 à 1.2), sinon scale normal
//             const scale = isActive
//                 ? animationSpring
//                 : 1;

//             tokenStyle.transform = `scale(${scale})`;
//             break;

//         case 'minimal-fade':
//             textClassName += "text-white";

//             // 🚀 ANIMATION SANS CSS (Méthode Interpolate de Remotion)
//             // On calcule l'opacité dynamiquement sur 3 frames pour créer un fondu propre à l'export
//             const opaciteProgressive = interpolate(
//                 framesDepuisLeDebutDuMot,
//                 [0, 3], // En 3 frames
//                 [0.4, 1], // On passe de 40% à 100% d'opacité
//                 { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
//             );

//             tokenStyle.opacity = isActive ? opaciteProgressive : 0.4;
//             break;

//         default:
//             textClassName += "text-white";
//             break;
//     }

//     return { tokenStyle, textClassName };
// };


import React from 'react';
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