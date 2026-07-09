import { create } from 'zustand'

type Store = {
    combineTokensWithinMilliseconds: number
    setCombineTokensWithinMilliseconds: (combineTokensWithinMilliseconds: number) => void
}

export const useCombineTokensWithinMillisecondsStore = create<Store>()((set) => ({
    combineTokensWithinMilliseconds: 0,
    setCombineTokensWithinMilliseconds: (combineTokensWithinMilliseconds: number) => set((state) => ({ combineTokensWithinMilliseconds })),
}))
