import Chat from "./components/Chat/Chat";
import Profile from "./components/Profile/Profile";
import FunFact from "./components/FunFact/FunFact";
import MessageInput from "./components/MessageInput/MessageInput";
import styles from "./App.module.css";
import { WS_ADDRESS } from "./settings";
import { UserContext } from "./contexts/user";
import useWebSocket from "./hooks/useWebSocket";
import { useState } from "react";

function App() {
  const { messages, user, setUser, stats, socketRef } =
    useWebSocket(WS_ADDRESS);

  const [factIsOpened, setFactIsOpened] = useState<boolean>(true);
  return (
    <div className={styles["app-wrapper"]}>
      <UserContext.Provider value={{ user, setUser }}>
        <Profile factIsOpened={factIsOpened} stats={stats} />
        <FunFact isOpened={factIsOpened} setIsOpened={setFactIsOpened} />
        <Chat messages={messages} />
        <MessageInput socketRef={socketRef} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
