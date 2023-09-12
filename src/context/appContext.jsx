import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const supabaseUrl = import.meta.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  let myChannel = null;
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    getMessagesAndSubscribe();
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setIsAuth(true);
        setUsername(session.user.user_metadata.username)
      } else {
        setIsAuth(false);
        setUsername("")
      }
    });

    return () => {
      if (myChannel.state === "joined") {
        supabase.removeChannel(myChannel);
        console.log("Remove supabase subscription by useEffect unmount");
      }
    };
  }, []);

  const handleNewMessage = (payload) => {
    setMessages((prevMessages) => [payload.new, ...prevMessages]);
  };

  const getInitialMessages = async () => {
    if (!messages.length) {
      const { data, error } = await supabase
        .from("messages")
        .select()
        .range(0, 29)
        .order("id", { ascending: false });
      if (error) {
        setError(error.message);
        supabase.removeChannel(myChannel);
        myChannel = null;
        return;
      }
      setMessages(data);
    }
  };

  const getMessagesAndSubscribe = async () => {
    setError("");
    if (!myChannel) {
      getInitialMessages();
      myChannel = supabase
        .channel('any')
        .on('postgres_changes', { event: '*', schema: '*' }, payload => {
          handleNewMessage(payload)
        })
        .subscribe()
    }
  };

  return (
    <AppContext.Provider value={{
      supabase,
      auth: supabase.auth,
      messages,
      isAuth,
      error,
      username,
    }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => useContext(AppContext)

export { AppContext as default, AppContextProvider, useAppContext }