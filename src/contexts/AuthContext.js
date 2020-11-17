import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password).then(
      async (res) => {
        const token = await auth?.currentUser?.getIdToken(true);
        localStorage.setItem("@token", token);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const logout = () => {
    auth.signOut().then((res) => {
      localStorage.removeItem("@token");
    });
    window.location.reload();
  };

  const value = {
    currUser,
    login,
    logout,
  };

  useEffect(() => {
    if(localStorage.getItem("@token")){
      localStorage.removeItem("@token");
    }
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if(user){
        await user.getIdToken(true).then(res => localStorage.setItem("@token", res));
      }
      setCurrUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
