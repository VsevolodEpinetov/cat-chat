import { createContext } from "react";
import { Author } from "../types";
import { DefaultSettings } from "../settings";

export const UserContext = createContext<Author>(DefaultSettings.User);
