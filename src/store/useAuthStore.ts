import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role =  "member" | "manager" | "admin";

export interface AuthUser {
    uid: string,
    email: string | null,
    name: string,
    username: string,
    role: Role,
    reservedMembers?: string[],
}

export interface AuthState {
    user: AuthUser | null,
    isLoading: boolean,
    setUser: (user: AuthUser | null) => void,
    setLoading: (value: boolean) => void,
    setLogoutUser: () => void,
}

export const useAuthStore = create<AuthState>()(
    // percist for caching data in localstorage
    persist(
        (set) => ({
            user: null,
            isLoading: true,
            setUser: (user) => set({ user: user }),
            setLoading: (value) => set({ isLoading: value }),
            setLogoutUser: () => set({ user: null, isLoading: false }),
        }), 
        {
            name: "auth-storage" // localhost key
        }
    )
);