import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";
import FunFact from "./components/FunFact/FunFact";
import MessageInput from "./components/MessageInput/MessageInput";
import styles from "./App.module.css";
import { WS_ADDRESS } from "./settings";
import { UserContext } from "./contexts/user";
import useWebSocket from "./hooks/useWebSocket";

function App() {
  const { messages, user, stats, socketRef } = useWebSocket(WS_ADDRESS);

  return (
    <div className={styles["app-wrapper"]}>
      <UserContext.Provider value={user}>
        <Profile />
        <FunFact />
        <Chat messages={messages} />
        <MessageInput socketRef={socketRef} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
