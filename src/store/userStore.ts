import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUserStore } from "../types/auth";

interface UserState {
    currentUser: AuthUserStore | null;
    setLoggedInUser: (user: AuthUserStore) => void;
    setLogoutUser: () => void;
    headerModalActive: boolean,
    setHeaderModalActive: (value: boolean) => void,
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            currentUser: null,
            setLoggedInUser: (user) => set({ currentUser: user, headerModalActive: false }),
            setLogoutUser: () => set({ currentUser: null, headerModalActive: false }),
            headerModalActive: false,
            setHeaderModalActive: (value: boolean) => set({ headerModalActive: value }),
        }),
        {
            name: "auth-storage", // save data to localStorage
        }
    )
);