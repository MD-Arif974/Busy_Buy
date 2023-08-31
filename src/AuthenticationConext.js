import { createContext, useContext, useRef, useState } from "react";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {toast} from 'react-toastify';

const authenticationContext = createContext();

export const useAuthValue = ()=> {
    const value = useContext(authenticationContext);
    return value;
}

const AuthenticationContext =({children}) =>{
    const [loggedIn,setLoggedIn] = useState(false);
    const [signUpSuccess,setSignUpSuccess] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    
     
    const handleLogout = () => {
        setLoggedIn(false);
        sessionStorage.removeItem('Auth Token');
    }
    
    const handleFormAction =(e,id)=>{
        e.preventDefault();

        const auth = getAuth();
       
        
        if(id === 2) {
            createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value)
        .then((response) => {
            sessionStorage.setItem('Auth Token',response._tokenResponse.refreshToken);
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
              .then((response) => {
                  sessionStorage.setItem('Auth Token',response._tokenResponse.refreshToken);
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
            setSignUpSuccess,handleLogout
        }}>
            {children}
        </authenticationContext.Provider>
    );
}

export default AuthenticationContext;