import { Link,Navigate } from 'react-router-dom';
import styles from './SignIn.module.css';
import { useAuthValue } from '../AuthenticationConext';



const SignIn = () => {
  const {emailRef,passwordRef,handleFormAction,loggedIn,
    setSignUpSuccess
  
  } = useAuthValue();
    

    if(loggedIn) {
      return <Navigate to="/" replace = {true}/>
    }
    return (
        <>
           <div className={styles.signInCont}>
               <h2>Sign In</h2>
               <div className={styles.signInForm}>
                 <input type='email' ref={emailRef} placeholder='Enter Email' /><br />
                 <input type='password' ref={passwordRef} placeholder='Enter Password' /><br/>
                 <button onClick={(e) => handleFormAction(e,1)}>Sign in</button>
               </div>
            
               <Link to="/signup" style={{textDecoration:"none",height:"auto",marginTop:"15px"}}><span onClick={() => setSignUpSuccess(false)}>Or SignUp instead</span></Link>
           </div>

        </>
    )
}

export default SignIn;