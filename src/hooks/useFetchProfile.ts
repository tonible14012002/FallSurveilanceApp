import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {API, API_PATH} from '~/constants/api';
import type {BaseResponse} from '~/schema/common';
import type {User} from '~/schema/identity';

export const PROFILE_KEY = 'PROFILE_KEY';

export const useFetchProfile = (id?: string, allowFetch?: boolean) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [id, PROFILE_KEY] : null,
    () =>
      API.FALL_SURVEILANCE.get(API_PATH.PROFILE).json<BaseResponse<User>>(
        u => u,
      ),
  );

  return {
    profile: data?.data,
    ...rest,
  };
};
