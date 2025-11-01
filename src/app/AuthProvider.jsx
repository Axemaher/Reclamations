import { createContext, useEffect, useState, useContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContext } from "../components/ToastsNotification/ToastNotification";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {  

      const { addToast } = useContext(ToastContext);
      const auth = getAuth();
      
      const [userLogged, setUserLogged] = useState(null);
      const [uid, setUid] = useState(null)
    
    
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserLogged(true);
            setUid(user.uid);
            console.log('logged - authprovider');
            addToast('Pomyślnie zalogowano', 'success');
          } else {
            setUserLogged(false);
            setUid(null);
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