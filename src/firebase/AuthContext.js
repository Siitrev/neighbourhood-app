import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUserDoc = null;

    const unsub = onAuthStateChanged(auth, async (u) => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
        unsubscribeUserDoc = null;
      }

      setUser(u);
      if (!u) {
        setRole(null);
        setGroupId(null);
        setUserData(null);
        setLoading(false);
        return;
      }
      
      try {
        const token = await getIdTokenResult(u, true);
        setRole(token.claims.role || "student");

        unsubscribeUserDoc = onSnapshot(doc(db, "users", u.uid), (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setGroupId(data.groupId || null);
            setUserData(data);
          } else {
            setGroupId(null);
            setUserData(null);
          }

          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching auth data:", error);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, role, groupId, loading }}>
      {children}
    </AuthContext.Provider>
  );
}