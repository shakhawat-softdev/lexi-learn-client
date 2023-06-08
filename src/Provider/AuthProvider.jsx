import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import app from '../Firebase/firebase.config';
import axios from 'axios';

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
   //Logou User
   const logout = () => {
      setLoading(true)
      return signOut(auth);
   };



   // CurrentlysignInuser
   // useEffect(() => {
   //    const unsubscribe = onAuthStateChanged(auth, user => {
   //       setLoading(false)
   //       setUser(user)
   //       console.log(user);
   //    });
   //    return () => {
   //       unsubscribe();
   //    }
   // }, [])

   useEffect(() => {
      const unsubcribe = onAuthStateChanged(auth, curerntUser => {
         setUser(curerntUser);
         console.log("Current User: ", curerntUser);

         // get and set token

         if (curerntUser) {
            axios.post('http://localhost:5000/jwt', { email: curerntUser.email })

               .then(data => {
                  // console.log("Token", data.data.token);
                  localStorage.setItem('access-token', data.data.token)
                  setLoading(false);
               })
         }
         else {
            localStorage.removeItem('access-token')
         }


      });
      return () => {
         return unsubcribe();
      }
   }, []);



   const authInfo = { user, loading, registerNewUser, loginWithEmailAndPass, loginWithGoogle, logout }
   return (
      <authContext.Provider value={authInfo}>
         {children}
      </authContext.Provider>
   );
};

export default AuthProvider;