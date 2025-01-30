'use client';
import { auth } from "@/lib/auth/firebase";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: User|null;
    anonymousSignIn: ()=> void;
};

export const MAX_ACTION_TIME = 1 * 1000; // 45sec
export const EXTRA_ACTION_TIME = 5 * 1000; // 5sec

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User| null>( auth.currentUser );
    useEffect(() => {
        const listener = onAuthStateChanged(
        auth,
        async (user) => {
            setUser(user);
        },
        ()=>{
            setUser(null);
        }
        );

        return () => {
            listener();
        };
    }, [auth]);

    const anonymousSignIn = async () => {
      try {
        const result = await signInAnonymously(auth);
        setUser(result.user);
      } catch (error) {
        console.error(error);
      }
    };
    return (
        <AuthContext.Provider
            value={{
                anonymousSignIn,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
