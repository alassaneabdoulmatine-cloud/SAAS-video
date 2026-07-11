import { create } from "zustand";

export type Token = {
    text: string;
    fromMs: number;
    toMs: number;
};

export type PageCaption = {
    text: string;
    startMs: number;
    durationMs: number;
    tokens: Token[];
};

type SubtitlesState = {
    pagesstore: PageCaption[]; // Ton tableau de pages initial
    setPagesstore: (pagesstore: PageCaption[]) => void;
    currentPage: PageCaption | null;
    setCurrentPage: (page: PageCaption | null) => void;
};

export const usePagesStore = create<SubtitlesState>((set) => ({
    pagesstore: [],
    setPagesstore: (pagesstore: PageCaption[]) => set({ pagesstore }),
    currentPage: null,
    setCurrentPage: (page: PageCaption | null) => set({ currentPage: page }),
}));