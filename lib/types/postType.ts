import { StaticImageData } from "next/image";

export interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  parentId: number; // Parent comment ID
}

// Comment interface definition
export interface Comment {
  id: number;
  author: string;
  avatar: StaticImageData;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Reply[];
}

export interface PostData {
  id: number;
  category: string;
  date: string;
  avatar?: StaticImageData;
  author: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
}
