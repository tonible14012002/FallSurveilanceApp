import {useFetchWithCache} from '~/libs/hooks/useFetchWithCache';
import {API, API_PATH} from '~/constants/api';
import type {BaseResponse} from '~/schema/common';
import {GetRoomMembersWithPermissionsResponse} from '~/schema/api/house';

export const ROOM_MEMBER_KEY = 'ROOM_MEMBER_KEY';

export const useFetchRoomMembers = (id?: string, allowFetch?: boolean) => {
  const {data, ...rest} = useFetchWithCache(
    allowFetch ? [id, ROOM_MEMBER_KEY] : null,
    () =>
      API.FALL_SURVEILANCE.get(
        API_PATH.HOUSE_SERVICES.ROOM_MEMBERS(id as string),
      ).json<BaseResponse<GetRoomMembersWithPermissionsResponse>>(u => u),
  );

  return {
    members: data?.data,
    ...rest,
  };
};
