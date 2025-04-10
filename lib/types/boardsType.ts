import { StaticImageData } from "next/image";

export type BoardItem = {
  id: number;
  name: string;
  description: string;
  avatar: string | StaticImageData;
  color: string;
  moderator: string;
  moderator_avatar: string;
  moderator_group_color: string;
  followers?: number;
  isFollow?: boolean;
  postsCount?: number;
  isNew?: boolean;
  trending?: boolean;
};

export type FilterType = 'all' | 'followed' | 'unfollowed';
