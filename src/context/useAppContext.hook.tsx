"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import { getCurrentAccount, normaliseUserFromAccount } from "@/lib/appwrite";

export interface User {
    $id: string;
    email: string;
    name?: string;
}

interface AppContextType {
    user: User | null;
    loading: boolean;
    setUser: Dispatch<SetStateAction<User | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    refreshUser: () => Promise<User | null>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async (): Promise<User | null> => {
        setLoading(true);
        try {
            const acc = await getCurrentAccount();
            console.log("Refreshed user account:", acc);
            const user = acc ? normaliseUserFromAccount(acc) : null;
            setUser(user);
            return user;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const acc = await getCurrentAccount();
                console.log("Fetched current account on mount:", acc);
                if (cancelled) return;
                setUser(acc ? normaliseUserFromAccount(acc) : null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    const value = useMemo(
        () => ({ user, loading, setUser, setLoading, refreshUser }),
        [user, loading]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within AppContextProvider");
    return context;
};