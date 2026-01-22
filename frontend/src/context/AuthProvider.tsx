"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContextType = {
    user: User | null;
};

type User = {
    _id: string;
    email: string;
    name: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user  }}>
            {children}
        </AuthContext.Provider>
        );
};

export const useAuth = () => useContext(AuthContext);