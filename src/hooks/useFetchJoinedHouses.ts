import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {API, API_PATH} from '~/constants/api';
import type {BaseResponse} from '~/schema/common';
import {GetJoinedHousesResponse} from '~/schema/api/house';

export const HOUSES_KEY = 'HOUSES_KEY';

export const useFetchJoinedHouses = (allowFetch: boolean = true) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [HOUSES_KEY] : null,
    () =>
      API.FALL_SURVEILANCE.get(API_PATH.HOUSE_SERVICES.JOINED_HOUSES).json<
        BaseResponse<GetJoinedHousesResponse>
      >(u => u),
  );

  return {
    houses: data?.data,
    ...rest,
  };
};
