import {API, API_PATH} from '~/constants/api';
import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {GetHouseRoomsResponse} from '~/schema/api/house';
import type {BaseResponse} from '~/schema/common';

export const ROOM_DETAIL_KEY = 'ROOM_DETAIL_KEY';

export const useFetchHouseRooms = (id?: string, allowFetch?: boolean) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [id, ROOM_DETAIL_KEY] : null,
    () =>
      API.FALL_SURVEILANCE.get(
        API_PATH.HOUSE_SERVICES.HOUSE_ROOMS(id as string),
      ).json<BaseResponse<GetHouseRoomsResponse>>(u => u),
  );

  return {
    rooms: data?.data,
    ...rest,
  };
};
