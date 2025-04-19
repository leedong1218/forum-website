import { ArticleOutlined, Groups, ThumbUp } from "@mui/icons-material";
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
}

export const STATS_CARDS = [
  { icon: Groups, label: '追蹤者', count: 142 },
  { icon: Groups, label: '正在追蹤', count: 98 },
  { icon: ArticleOutlined, label: '文章', count: 56 },
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