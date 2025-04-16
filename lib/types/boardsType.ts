import { StaticImageData } from "next/image";

export type BoardItem = {
  id: number;
  name: string;
  description: string;
  avatar: string | StaticImageData;
  color: string;
  moderator: string;
  moderatorAvatar: string;
  moderatorGroupColor: string;
  followers?: number;
  isFollow?: boolean;
  postsCount?: number;
  isNew?: boolean;
  trending?: boolean;
};

export type CreatableBoardItem = {
  id: number;
  name: string;
  avatar: string | null;
};

export type FilterType = 'all' | 'followed' | 'unfollowed';
