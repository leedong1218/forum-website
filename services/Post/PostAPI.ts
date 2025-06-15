import API from '@/system/API';
import { Response } from '@/lib/types/requestType';
import { PostListResponse, PostType } from '@/lib/types/postListType';

export interface CreatePostPayload {
  board: number;
  title: string;
  content: string;
  attachments?: File[];
}

export interface CreatePostResponse {
  boardUrl: string;
}

const BASE_URL = '/post';

const PostAPI = {
  get: (id: number): Promise<Response<PostType>> => {
    return API.get(`/post/${id}`);
  },  
  create: (data: CreatePostPayload): Promise<Response<CreatePostResponse>> => {
    const fd = new FormData();
    fd.append('board', String(data.board));
    fd.append('title', data.title);
    fd.append('content', data.content);

    data.attachments?.forEach(f => fd.append('attachments', f));

    return API.post(BASE_URL, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  list: (params?: {
    board?: string;
    sort?: string;
    search?: string;
    page?: number;
  }): Promise<Response<PostListResponse>> => {
    return API.get(BASE_URL, { params });
  },
};

export default PostAPI;