export interface PostListResponse {
  boardName: string;
  boardAvatar: string | null;
  boardColor: string;
  posts: PostType[];
  hasMore: boolean;
}

export interface PostType {
  id: string;
  title: string;
  content: string;
  board: number;
  boardAvatar: string;
  boardName: string;
  boardColor: string;
  boardUrl: string;
  author: number;
  authorName: string;
  authorGroupName: string;
  authorGroupColor: string;
  authorAvatar: string;
  isMine: boolean;
  attachments: {
    id: number;
    url: string;
    originalFilename: string;
  }[];
  createdAt: string;
  isPinned: boolean;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  isBookmarked: boolean;
  bookmarksCount: number;
}

export interface ArticleFormValues {
  sortType: string;
  searchValue: string;
  viewMode: ViewMode;
}

export type SortType = "top" | "new";

export type ViewMode = "grid" | "list";
