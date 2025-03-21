import { auth } from "@/pages/api/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useGoogleAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
 
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
        
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
        
      });
  
      return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);
  
    return { user, loading };
  };