export interface PostType {
  id: number;
  title: string;
  description: string;
  author: string;
  avatar: string;
  category: string;
  comments: number;
  views: number;
  likes?: number;
  bookmarks?: number;
  timestamp: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface ArticleFormValues {
  sortType: string;
  searchValue: string;
  viewMode: ViewMode;
}

export type SortType = "熱門" | "最新";

export type ViewMode = "grid" | "list";
