import {Timestamp} from 'firebase/firestore';


export interface UserComment {
  id?: string; // Firestore will generate this ID
  text: string; // The actual comment text
  userId: string; // ID of the user who posted the comment
  username: string; // Name of the user (optional for display)
  createdAt: Timestamp; // Timestamp when the comment was created
}