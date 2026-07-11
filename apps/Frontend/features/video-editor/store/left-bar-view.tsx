import { create } from 'zustand'

type Store = {
    selectedView: "style" | "subtitles" | "parametre"
    setSelectedView: (selectedView: "style" | "subtitles" | "parametre") => void
}

export const useLeftBarViewStore = create<Store>()((set) => ({
    selectedView: "style",
    setSelectedView: (selectedView: "style" | "subtitles" | "parametre") => set((state) => ({ selectedView })),
}))