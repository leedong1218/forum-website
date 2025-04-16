export interface PostListResponse {
  boardName: string;
  boardAvatar: string | null;
  boardColor: string;
  posts: PostType[];
}

export interface PostType {
  id: number;
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
  isLocked: boolean;
}

export interface ArticleFormValues {
  sortType: string;
  searchValue: string;
  viewMode: ViewMode;
}

export type SortType = "熱門" | "最新";

export type ViewMode = "grid" | "list";
