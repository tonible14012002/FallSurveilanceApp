import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {API, API_PATH} from '~/constants/api';
import type {BaseResponse} from '~/schema/common';
import {GetHouseDetailResponse} from '~/schema/api/house';

export const HOUSES_KEY = 'HOUSES_KEY';

export const useFetchHouses = (id?: string, allowFetch?: boolean) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [HOUSES_KEY] : null,
    () =>
      API.FALL_SURVEILANCE.get(
        API_PATH.HOUSE_SERVICES.HOUSE_DETAIL(id as string),
      ).json<BaseResponse<GetHouseDetailResponse>>(u => u),
  );

  return {
    detail: data?.data,
    ...rest,
  };
};
