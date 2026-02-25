import React, { ReactNode, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const setUser = useAuthStore((state) => state.setUser);
    const isLoading = useAuthStore((state) => state.isLoading);
    const setIsLoading = useAuthStore((state) => state.setLoading);
    const setLogoutUser = useAuthStore((state) => state.setLogoutUser);

    // синхонізація даних в firebase та zustand
    useEffect(() => {
        const unscubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            // user that is stored in firebase cache
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || 'User',
                    username: firebaseUser.email?.split('@')[0] || "user",
                    role: 'admin', // todo - temporary admin
                    reservedMembers: [], // todo - temporary empty array
                });
            } else {
                setLogoutUser();
            }
            setIsLoading(false);
        });
        return () => unscubscribe();
    }, [setUser, setIsLoading]);


    if (isLoading)
        return <div>Loading...</div>; // todo - add real loader

    return <>{children}</>;
}