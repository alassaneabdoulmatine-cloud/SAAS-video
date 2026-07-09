import { create } from "zustand";

type GeneralSubtitleSettingsState = {
    // --- Valeurs ---
    wordPerLine: string;
    posX: number;
    posY: number;
    autoEmoji: string;
    keywordHighlights: boolean;
    styleColors: string[]; // hex colors
    punctuation: boolean;
    breakLines: boolean;
    gapFree: boolean;
    borderRadius: number;

    // --- Actions ---
    setWordPerLine: (value: string) => void;
    setPosX: (value: number) => void;
    setPosY: (value: number) => void;
    setAutoEmoji: (value: string) => void;
    setKeywordHighlights: (value: boolean) => void;
    setStyleColors: (colors: string[]) => void;
    setPunctuation: (value: boolean) => void;
    setBreakLines: (value: boolean) => void;
    setGapFree: (value: boolean) => void;
    setBorderRadius: (value: number) => void;
};

export const useGeneralSubtitleSettingsStore = create<GeneralSubtitleSettingsState>((set) => ({
    // --- Defaults ---
    wordPerLine: "1",
    posX: 50,
    posY: 68,
    autoEmoji: "none",
    keywordHighlights: false,
    styleColors: ["#000000", "#00ff00"],
    punctuation: false,
    breakLines: true,
    gapFree: true,
    borderRadius: 0.1,

    // --- Setters ---
    setWordPerLine: (wordPerLine) => set({ wordPerLine }),
    setPosX: (posX) => set({ posX }),
    setPosY: (posY) => set({ posY }),
    setAutoEmoji: (autoEmoji) => set({ autoEmoji }),
    setKeywordHighlights: (keywordHighlights) => set({ keywordHighlights }),
    setStyleColors: (styleColors) => set({ styleColors }),
    setPunctuation: (punctuation) => set({ punctuation }),
    setBreakLines: (breakLines) => set({ breakLines }),
    setGapFree: (gapFree) => set({ gapFree }),
    setBorderRadius: (borderRadius) => set({ borderRadius }),
}));
