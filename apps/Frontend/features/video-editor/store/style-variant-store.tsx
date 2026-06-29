import { create } from 'zustand'
import { styleComponentType } from '../types/style-component-type'



type Store = {
    stylevariant: styleComponentType | null
    setvariant: (stylevariant: styleComponentType) => void
}

export const useStyleVariantStore = create<Store>()((set) => ({
    stylevariant: null,
    setvariant: (stylevariant: styleComponentType) => set({ stylevariant }),
}))
