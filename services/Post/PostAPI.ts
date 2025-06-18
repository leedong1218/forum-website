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

  bookMark: (post_id: string): Promise<Response<unknown>> =>
    API.post(`${BASE_URL}/${post_id}/bookmark/`),

  like: (post_id: string): Promise<Response<unknown>> =>
    API.post(`${BASE_URL}/${post_id}/like/`),

  update: (post_id: string, data: CreatePostPayload): Promise<Response<unknown>> => {
    const fd = new FormData();
    fd.append('board', String(data.board));
    fd.append('title', data.title);
    fd.append('content', data.content);

    data.attachments?.forEach(f => fd.append('attachments', f));

    return API.patch(`${BASE_URL}/${post_id}/edit/`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  delete: (post_id: string): Promise<Response<unknown>> =>
    API.delete(`${BASE_URL}/${post_id}/delete/`),

};

export default PostAPI;