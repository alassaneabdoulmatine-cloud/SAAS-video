import { create } from "zustand";

type UploadState = {
    uploadProgress: number;
    setUploadProgress: (uploadProgress: number) => void;
};

export const useUploadStore = create<UploadState>((set) => ({
    uploadProgress: 0,
    setUploadProgress: (uploadProgress: number) => set({ uploadProgress }),
}));