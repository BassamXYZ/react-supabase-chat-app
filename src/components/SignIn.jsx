import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import styles from './Sign.module.css'

function SignIn() {
  const { isAuth, auth } = useAppContext();
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      return navigate("/");
    };
  }, [isAuth])

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = auth.signInWithPassword({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (error) {
        console.error(error.message);
        return;
      }
      console.log("Sucsessfully sent!");
    } catch (error) {
      console.log("error sending message:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign in</h1>
      <form onSubmit={handleSignIn} autoComplete="off">
        <label htmlFor='email'>Email</label>
        <input ref={emailRef} type='email' name="email"></input>
        <label htmlFor='password'>Password</label>
        <input ref={passwordRef} type='password' name="password"></input>
        <button type="submit">Sign In</button>
      </form>
      <Link to={`/signup`}>Sign up</Link>
    </div>
  )
}

export default SignIn;