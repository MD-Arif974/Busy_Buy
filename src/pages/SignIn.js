import { Link } from 'react-router-dom';
import styles from './SignIn.module.css';

const SignIn = () => {

    return (
        <>
           <div className={styles.signInCont}>
               <h2>Sign In</h2>
               <form>
                 <input type='email' placeholder='Enter Email' /><br />
                 <input type='password' placeholder='Enter Password' /><br/>
                 <button>Sign in</button>
               </form>
               <Link to="/signup" style={{textDecoration:"none"}}><h4 >Or SignUp instead</h4></Link>
           </div>

        </>
    )
}

export default SignIn;