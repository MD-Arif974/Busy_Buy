import { createContext, useContext, useRef, useState } from "react";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import { db } from "./firebaseInit";
import {collection, doc,setDoc} from 'firebase/firestore';

import {toast} from 'react-toastify';

const authenticationContext = createContext();

export const useAuthValue = ()=> {
    const value = useContext(authenticationContext);
    return value;
}

const AuthenticationContext =({children}) =>{
    const [loggedIn,setLoggedIn] = useState(false);
    const [signUpSuccess,setSignUpSuccess] = useState(false);
    let [userName,setUserName] = useState("");
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    
     
    const handleLogout = () => {
        setLoggedIn(false);
        sessionStorage.removeItem('Auth Token');
    }
    
    const handleFormAction =async(e,id)=>{
        e.preventDefault();

        const auth = getAuth();
       
        
        if(id === 2) {
            createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
        .then((response) => {
            sessionStorage.setItem('Auth Token',response.user.email);
            localStorage.setItem(emailRef.current.value,nameRef.current.value);
            setSignUpSuccess(true);
            toast.success("Sign Up Successfully!!");
        })
        .catch((error) => {
            toast.error(error.code);
            setSignUpSuccess(false);
        })
        }
        else if(id === 1) {
          
              signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
              .then(async(response) => {
                  
                  const email = response.user.email;
                  
                  sessionStorage.setItem('Auth Token',response.user.email);
                  setLoggedIn(true);
              
                  toast.success("Signed In Successfully!!");
                  
              })
              .catch((error) => {
                  if(error.code === 'auth/wrong-password') {
                    toast.error("Please check your password!");
                  }
                  if(error.code === 'auth/user-not-found') {
                    toast.error("Please check your Email");
                  }
                  if(error.code === 'auth/email-already-in-use') {
                    toast.error("Email Already in use");
                  }
                 setLoggedIn(false);
              })
        }
    }
    return (
        <authenticationContext.Provider value={{
            nameRef,emailRef,passwordRef,handleFormAction, loggedIn,setLoggedIn,signUpSuccess,
            setSignUpSuccess,handleLogout,userName,setUserName
        }}>
            {children}
        </authenticationContext.Provider>
    );
}

export default AuthenticationContext;

// "niQJKvunJTdsWkADsNA9is5YgGH3"
// "eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MGI5ZGUwODBmZmFmYmZjMTgzMzllY2Q0NGFjNzdmN2ZhNGU4ZDMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVzeWJ1eS02NzJhYSIsImF1ZCI6ImJ1c3lidXktNjcyYWEiLCJhdXRoX3RpbWUiOjE2OTM2MzAzNjEsInVzZXJfaWQiOiJuaVFKS3Z1bkpUZHNXa0FEc05BOWlzNVlnR0gzIiwic3ViIjoibmlRSkt2dW5KVGRzV2tBRHNOQTlpczVZZ0dIMyIsImlhdCI6MTY5MzYzMDM2MSwiZXhwIjoxNjkzNjMzOTYxLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYWJjQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.reGsr8gBhdr6aoWUhvyLOCM_BM_vYIoFfw25Rmf7E_-Ix4a1a14nDF-R_xiE3z1d7NXtFuH7l-GfdNgzrF0T4mz__nTD2J47jzidc_c6lloLLxtUJ2V5880Z9DVP4BUIeWDp3ezkyblVXEHr0jVkeDbgPf6gkQZ4qHy5s_YYLIaCiWQgWB1VTLP7mfwKvN_i1EtiW7mx6fBq-0hI1goMjxxxEjm8WLc-3xhkGrjXCHOtaQF6_HahPne-y5jv3_D-S6MFGmnOT9b9HEa3A4u3MdSBoLXtrWHkzq3xaAvS4aaHl3UwYrMsEmca8HTiIoUgcqY69ZTzNGjv7Uv21Ajozg"