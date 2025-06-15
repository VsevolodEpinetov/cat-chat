import { createContext } from "react";
import { UserContextType } from "../types";
import { DefaultSettings } from "../settings";

export const UserContext = createContext<UserContextType>({
  user: DefaultSettings.User,
  setUser: () => {},
});
