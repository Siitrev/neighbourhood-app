import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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
    const unsub = onAuthStateChanged(auth, async (u) => {
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
        
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) {
          const data = snap.data();
          setGroupId(data.groupId || null);
          setUserData(data); // Store the full Firestore document globally
        } else {
          setGroupId(null);
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, role, groupId, loading }}>
      {children}
    </AuthContext.Provider>
  );
}