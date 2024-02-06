import {API, API_PATH} from '~/constants/api';
import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {HouseInfo} from '~/schema/api/house';
import type {BaseResponse} from '~/schema/common';

export const JOINED_HOUSES_KEY = 'JOINED_HOUSES_KEY';

export const useFetchJoinedHouses = (allowFetch = true) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [JOINED_HOUSES_KEY] : null,
    () =>
      API.FALL_SURVEILANCE.get(API_PATH.HOUSE_SERVICES.JOINED_HOUSES).json<
        BaseResponse<HouseInfo[]>
      >(u => u),
  );

  return {
    houses: data?.data,
    ...rest,
  };
};
