import { createContext, useContext, useRef, useState } from "react";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {toast} from 'react-toastify';

// creating context
const authenticationContext = createContext();


// custome hooks to consume context
export const useAuthValue = ()=> {
    const value = useContext(authenticationContext);
    return value;
}


// Custom AuthenticationContext 
const AuthenticationContext =({children}) =>{
    const [loggedIn,setLoggedIn] = useState(false);// to check user is loggedIn or not
    const [signUpSuccess,setSignUpSuccess] = useState(false);
    let [userName,setUserName] = useState(""); // to store username 
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    
     // This method is to logout the page 
    const handleLogout = () => {
        setLoggedIn(false);
        sessionStorage.removeItem('Auth Token');
    }
    
    // This method is used to store data on local storage and session storage based on id that is signIn or signUp
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

