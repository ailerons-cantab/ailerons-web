"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface User {
  $id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AppContextType {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  return <AppContext.Provider value={{ user, loading, setUser, setLoading }}>{children}</AppContext.Provider>
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};