export interface Author {
  name: string;
  id: string;
  avatarId: number;
}

export interface ChatMessage {
  author: Author;
  text: string;
  timestamp: number;
}

export interface Stats {
  bots: number;
  realPeople: number;
}
