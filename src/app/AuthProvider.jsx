import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {  

      const auth = getAuth();
      
      const [userLogged, setUserLogged] = useState(null);
      const [uid, setUid] = useState(null)
    
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserLogged(true);
            setUid(user.uid);
            console.log('logged - authprovider')
          } else {
            setUserLogged(false);
            setUid(null)
          }
        });
        return () => unsubscribe();
      }, [auth]);


  return (
    <AuthContext.Provider value={{ userLogged, uid }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export {AuthContext}