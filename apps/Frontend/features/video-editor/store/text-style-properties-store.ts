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

    // Actions pour modifier l'état
    setFontFamily: (font: string) => void;
    setFontSize: (size: number) => void;
    setStyles: (styles: string[]) => void;
    setCasing: (casing: string) => void;
    setColor: (color: string) => void;
    setLetterSpacing: (spacing: number) => void;
    setLineHeight: (height: number) => void;
    setAlignment: (alignment: string) => void;
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

    // Setters
    setFontFamily: (fontFamily) => set({ fontFamily }),
    setFontSize: (fontSize) => set({ fontSize }),
    setStyles: (styles) => set({ styles }),
    setCasing: (casing) => set({ casing }),
    setColor: (color) => set({ color }),
    setLetterSpacing: (letterSpacing) => set({ letterSpacing }),
    setLineHeight: (lineHeight) => set({ lineHeight }),
    setAlignment: (alignment) => set({ alignment }),
}));