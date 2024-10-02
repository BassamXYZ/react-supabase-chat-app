import { useEffect, useRef } from 'react'
import { useAppContext } from '../context/appContext'
import styles from './Sign.module.css'

function SignUp() {
  const { auth, isAuth } = useAppContext();
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      return navigate("/");
    };
  }, [isAuth])

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = auth.signUp({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        options: {
          data: {
            username: usernameRef.current.value,
          },
        }
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
      <h1>Sign up</h1>
      <form onSubmit={handleSignUp} autoComplete="off">
        <label htmlFor='username'>Name</label>
        <input ref={usernameRef} type='text' name="username"></input>
        <label htmlFor='email'>Email</label>
        <input ref={emailRef} type='email' name="email"></input>
        <label htmlFor='password'>Password</label>
        <input ref={passwordRef} type='password' name="password"></input>
        <button type="submit">Sign up</button>
      </form>
      <Link to={`/signin`}>Sign in</Link>
    </div>
  )
}

export default SignUp