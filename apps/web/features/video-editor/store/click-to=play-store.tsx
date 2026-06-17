import { create } from 'zustand'

type Store = {
    isPlaying: boolean
    togglePlay: () => void
}

export const useClickToPlayStore = create<Store>()((set) => ({
    isPlaying: false,
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}))

