import styles from './SignIn.module.css';
import { Link } from 'react-router-dom';

const SignUp = () => {

    return (
        <>
          
           <div className={styles.signUpCont}>
               <h2>Sign Up</h2>
               <form>
                 <input type='text' placeholder='Enter Name' /><br />
                 <input type='email' placeholder='Enter Email' /><br/>
                 <input type='password' placeholder='Enter Password' /><br/>
                 <button>Sign Up</button>
               </form>
              
           </div>
         
           

        </>
    )
}

export default SignUp;