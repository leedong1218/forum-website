import { StaticImageData } from "next/image";

export type BoardsType = {
  id: number;
  title: string;
  description: string;
  avatar: StaticImageData;
  category: string;
  followers: number;
  isFollow: boolean;
  isNew?: boolean;
  trending?: boolean;
  postsCount?: number;
};

export type FilterType =  "all" | "followed" | "unfollowed";