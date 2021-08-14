import React, { createContext, useContext } from "react";
import firebase from "firebase";
import { useState } from "react";
import { useEffect } from "react";
import { authService } from "../fbase";

export const AuthContext = createContext<firebase.User | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscribe;
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);
