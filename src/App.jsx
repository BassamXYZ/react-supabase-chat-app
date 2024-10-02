import { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { useAppContext } from './context/appContext'

function App() {
  const { username, isAuth, error, messages, supabase, auth } = useAppContext();
  //const navigate = useNavigate()
  const reversed = [/*...*/messages].reverse()
  const messageRef = useRef()
  const dummy = useRef()

  /*useEffect(() => {
    if (!isAuth) {
      return navigate("/signin");
    };
  }, [isAuth])*/

  useEffect(() => {
    dummy.current && dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!messageRef.current.value) return;

    try {
      const { error } = await supabase.from("messages").insert([
        {
          text: messageRef.current.value,
          username: username,
        },
      ]);

      if (error) {
        console.error(error.message);
        return;
      }
      messageRef.current.value = "";
    } catch (error) {
      console.log("error sending message:", error);
    }
  }

  const signOut = async () => {
    const { error } = await auth.signOut()
  }

  const isValidUrl = urlString => {
    let url;
    try {
      url = new URL(urlString);
    } catch (error) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  if (error) {
    return (
      <div className={styles.container}>
        <nav>
          <h1>chat</h1>
          <button>Sign out</button>
        </nav>
        <div className={styles.chat}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header>
        <h1>chat</h1>
        <button onClick={signOut}>Sign out</button>
      </header>
      <main>
        {
          reversed.length
            ?
            reversed.map((message) =>
              <div /*className={message.username === username ? styles.sent : styles.received}*/ key={message/*.id*/}>
                <p>{/*isValidUrl(message.text) ? <a href={message.text} target="_blank">{message.text}</a> : message.text*/} Text</p>
                <p>@{/*message.username*/}</p>
              </div>
            )
            :
            "Nomessages"
        }
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage} autoComplete="off">
        <input name='massage' ref={messageRef}></input>
        <button type="submit">send</button>
      </form>
    </div>
  )
}

export default App