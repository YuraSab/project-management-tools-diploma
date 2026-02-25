import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean,
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIdAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIdAuthenticated(true);
    }
    const logout = () => {
        localStorage.removeItem("token");
        setIdAuthenticated(false);
    }
    const value = {
        isAuthenticated,
        login,
        logout,
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');
    return context;
};