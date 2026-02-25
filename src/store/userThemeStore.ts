import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BackgroundModeType, IconColorType, HighlightModeType } from "../types/userTheme";

interface UserThemeState {
    backgroundMode: BackgroundModeType;
    highlightMode: HighlightModeType;
    iconColor: IconColorType;
    setBackgroundMode: (mode: BackgroundModeType) => void;
    setHighlightMode: (mode: HighlightModeType) => void;
    setIconColor: (mode: IconColorType) => void;
    clearTheme: () => void;
}

export const useUserThemeStore = create<UserThemeState>()(
    persist(
        (set) => ({
            backgroundMode: "white",
            highlightMode: "purple",
            iconColor: "purple",
            setBackgroundMode: (mode) => set({ backgroundMode: mode }),
            setHighlightMode: (mode) => set({ highlightMode: mode }),
            setIconColor: (mode) => set({ iconColor: mode }),
            clearTheme: () => set({ 
                backgroundMode: "white",
                highlightMode: "purple",
                iconColor: "purple",
             })
        }),
        {
            name: "theme-storage", // save data to localStorage
        }
    )
);