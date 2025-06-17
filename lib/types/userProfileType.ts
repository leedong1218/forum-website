import { ArticleOutlined, ThumbUp } from "@mui/icons-material";
import { ReactNode } from "react";

export interface UserProfile {
  username?: string;
  email?: string;
  displayName?: string;
  birthday?: string;
  location?: string;
  avatarUrl?: string;
  coverUrl?: string;
  joinedDate?: string;
  verified?: boolean;
  likeCount: number;
  postCount: number;
  info?: string;
  avatar?: string;
}

export const STATS_CARDS = [
  { icon: ArticleOutlined, label: '貼文數', count: 56 },
  { icon: ThumbUp, label: '獲得讚數', count: '1.2K' }
];

export interface EditPopupTypes {
  isEditingProfile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setIsEditingProfile: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: any;
}

export interface TabPanelProps {
  children: ReactNode;
  value: number;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // For ...other spread props
}