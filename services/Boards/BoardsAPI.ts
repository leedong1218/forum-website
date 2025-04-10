import API from '../../system/API';
import { BoardItem } from '@/lib/types/boardsType';
import { Response } from '@/lib/types/requestType';

const BASE_URL = '/boards';

const BoardsAPI = {
  'getList': (): Promise<Response<BoardItem[]>> =>
    API.get(`${BASE_URL}`),
};

export default BoardsAPI;