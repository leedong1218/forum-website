import API from '../../system/API';
import { BoardItem, CreatableBoardItem } from '@/lib/types/boardsType';
import { Response } from '@/lib/types/requestType';

const BASE_URL = '/boards';

const BoardsAPI = {
  getList: (): Promise<Response<BoardItem[]>> =>
    API.get(`${BASE_URL}`),

  listCreatableBoards: (): Promise<Response<CreatableBoardItem[]>> =>
    API.get(BASE_URL + '/creatable'),

  follow: (board_id: string): Promise<Response<BoardItem[]>> =>
    API.post(`${BASE_URL}/${board_id}/follow/`),
};

export default BoardsAPI;