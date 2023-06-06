import { createContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const authContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);


   //Create New User 
   const registerNewUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password)
   };

   //loginWithEmailAndPass
   const loginWithEmailAndPass = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
   };

   const loginWithGoogle = () => {
      setLoading(true)
      return signInWithPopup(auth, googleProvider);
   }



   const logout = () => {
      setLoading(true)
      return signOut(auth);
   };









   const authInfo = { user, loading, registerNewUser, loginWithEmailAndPass, loginWithGoogle, logout }
   return (
      <authContext.Provider value={authInfo}>
         {children}
      </authContext.Provider>
   );
};

export default AuthProvider;