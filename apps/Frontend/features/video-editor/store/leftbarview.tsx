import { create } from 'zustand'

type Store = {
    selectedView: "home" | "style" | "subtitles" | "parametre"
    setSelectedView: (selectedView: "home" | "style" | "subtitles" | "parametre") => void
}

export const useLeftBarViewStore = create<Store>()((set) => ({
    selectedView: "style",
    setSelectedView: (selectedView: "home" | "style" | "subtitles" | "parametre") => set((state) => ({ selectedView })),
}))