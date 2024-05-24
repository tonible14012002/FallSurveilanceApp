import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {API, API_PATH} from '~/constants/api';
import type {BaseResponse} from '~/schema/common';
import {GetHouseDetailResponse} from '~/schema/api/house';
import {useSWRConfig} from 'swr';

export const HOUSE_DETAIL_KEY = 'HOUSE_DETAIL_KEY';

export const useFetchHouseDetail = (id?: string, allowFetch?: boolean) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [id, HOUSE_DETAIL_KEY] : null,
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

export const useMutateHouseDetail = (id: string) => {
  const {mutate} = useSWRConfig();
  return (data: GetHouseDetailResponse, revalidate: boolean = true) =>
    mutate(
      id ? [id, HOUSE_DETAIL_KEY] : null,
      {
        data: data,
      } as BaseResponse<GetHouseDetailResponse>,
      {
        revalidate,
      },
    );
};
