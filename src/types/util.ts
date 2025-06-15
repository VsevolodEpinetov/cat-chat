import { Author } from "./chat";

export interface UserContextType {
  user: Author;
  setUser: React.Dispatch<React.SetStateAction<Author>>;
}
