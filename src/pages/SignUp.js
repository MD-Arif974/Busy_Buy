import { useAuthValue } from '../AuthenticationConext';
import styles from './SignIn.module.css';


const SignUp = () => {
     const {nameRef,emailRef,passwordRef,handleFormAction} = useAuthValue();

    return (
        <>
          
           <div className={styles.signUpCont}>
               <h2>Sign Up</h2>
               <form>
                 <input type='text' ref={nameRef} placeholder='Enter Name' /><br />
                 <input type='email' ref={emailRef} placeholder='Enter Email' /><br/>
                 <input type='password' ref={passwordRef} placeholder='Enter Password' /><br/>
                 <button onClick={(e) => handleFormAction(e,2)}>Sign Up</button>
               </form>
              
           </div>
         
           

        </>
    )
}

export default SignUp;