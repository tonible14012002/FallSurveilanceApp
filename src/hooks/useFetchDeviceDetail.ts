import {API, API_PATH} from '~/constants/api';
import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {GetDeviceDetailResponse} from '~/schema/api/house';
import type {BaseResponse} from '~/schema/common';

export const DEVICE_DETAIL_KEY = 'DEVICE_DETAIL_KEY';

export const useFetchDeviceDetail = (id?: string, allowFetch?: boolean) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [id, DEVICE_DETAIL_KEY] : null,
    () =>
      API.FALL_SURVEILANCE.get(
        API_PATH.DEVICE_SERVICES.DEVICE_DETAIL(id as string),
      ).json<BaseResponse<GetDeviceDetailResponse>>(u => u),
  );

  return {
    detail: data?.data,
    ...rest,
  };
};
