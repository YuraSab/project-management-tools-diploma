import {create} from "zustand";

interface HeaderStoreState {
    isHeaderModalOpened: boolean,
    setIsHeaderModalToggle: () => void,
}

export const useHeaderStore = create<HeaderStoreState>((set, get) => ({
    isHeaderModalOpened: false,
    setIsHeaderModalToggle: () => set({ isHeaderModalOpened: !get().isHeaderModalOpened })
}));