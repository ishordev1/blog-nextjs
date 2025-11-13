"use client";
import { getCurrentUser } from "@/service/Auth";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser({ ...currentUser });
        }
      } catch (err) {
        console.error(err);
        setUser(undefined);
      }
       finally {
        setLoading(false); 
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={
        // JSX expression start
        { user, setUser ,loading} // JavaScript object pass
      }
    >
      {children}
    </UserContext.Provider>
  );
};
