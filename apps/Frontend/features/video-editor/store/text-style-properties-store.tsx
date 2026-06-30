import { create } from "zustand";

type TextStylePropertiesState = {
    fontFamily: string;
    fontSize: number;
    styles: string[]; // ["bold", "underline", "italic"]
    casing: string;   // "uppercase" | "lowercase" | "capitalize"
    color: string;
    letterSpacing: number;
    lineHeight: number;
    alignment: string;

    strokeEnabled: boolean;
    strokeThickness: number;
    strokeColor: string;

    shadowEnabled: boolean;
    shadowColor: string;
    shadowOpacity: number;
    shadowBlur: number;
    shadowDistance: number;
    shadowAngle: number;

    // Actions pour modifier l'état
    setFontFamily: (font: string) => void;
    setFontSize: (size: number) => void;
    setStyles: (styles: string[]) => void;
    setCasing: (casing: string) => void;
    setColor: (color: string) => void;
    setLetterSpacing: (spacing: number) => void;
    setLineHeight: (height: number) => void;
    setAlignment: (alignment: string) => void;

    setStrokeEnabled: (enabled: boolean) => void;
    setStrokeThickness: (thickness: number) => void;
    setStrokeColor: (color: string) => void;

    setShadowEnabled: (enabled: boolean) => void;
    setShadowColor: (color: string) => void;
    setShadowOpacity: (opacity: number) => void;
    setShadowBlur: (blur: number) => void;
    setShadowDistance: (distance: number) => void;
    setShadowAngle: (angle: number) => void;
}

export const useTextStylePropertiesStore = create<TextStylePropertiesState>((set) => ({
    fontFamily: "Montserrat",
    fontSize: 34,
    styles: [],
    casing: "uppercase",
    color: "#ffffff",
    letterSpacing: 0,
    lineHeight: 0,
    alignment: "center",

    strokeEnabled: false,
    strokeThickness: 10,
    strokeColor: "#000000",

    shadowEnabled: false,
    shadowColor: "#000000",
    shadowOpacity: 70,
    shadowBlur: 15,
    shadowDistance: 5,
    shadowAngle: -45,

    // Setters
    setFontFamily: (fontFamily) => set({ fontFamily }),
    setFontSize: (fontSize) => set({ fontSize }),
    setStyles: (styles) => set({ styles }),
    setCasing: (casing) => set({ casing }),
    setColor: (color) => set({ color }),
    setLetterSpacing: (letterSpacing) => set({ letterSpacing }),
    setLineHeight: (lineHeight) => set({ lineHeight }),
    setAlignment: (alignment) => set({ alignment }),

    setStrokeEnabled: (enabled) => set({ strokeEnabled: enabled }),
    setStrokeThickness: (thickness) => set({ strokeThickness: thickness }),
    setStrokeColor: (color) => set({ strokeColor: color }),

    setShadowEnabled: (enabled) => set({ shadowEnabled: enabled }),
    setShadowColor: (color) => set({ shadowColor: color }),
    setShadowOpacity: (opacity) => set({ shadowOpacity: opacity }),
    setShadowBlur: (blur) => set({ shadowBlur: blur }),
    setShadowDistance: (distance) => set({ shadowDistance: distance }),
    setShadowAngle: (angle) => set({ shadowAngle: angle }),
}));