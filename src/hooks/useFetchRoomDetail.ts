import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {API, API_PATH} from '~/constants/api';
import type {BaseResponse} from '~/schema/common';
import {GetRoomDetailResponse} from '~/schema/api/house';

export const ROOM_DETAIL_KEY = 'ROOM_DETAIL_KEY';

export const useFetchRoomDetail = (id?: string, allowFetch?: boolean) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [id, ROOM_DETAIL_KEY] : null,
    () =>
      API.FALL_SURVEILANCE.get(
        API_PATH.HOUSE_SERVICES.ROOM_DETAIL(id as string),
      ).json<BaseResponse<GetRoomDetailResponse>>(u => u),
  );

  return {
    detail: data?.data,
    ...rest,
  };
};
