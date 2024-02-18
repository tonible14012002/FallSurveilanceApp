import {API, API_PATH} from '~/constants/api';
import {ROOM_PERMISSIONS} from '~/constants/permissions';
import {useFetchInfinite} from '~/libs/hooks/useFetchInfinite';
import {User} from '~/schema/api/identity';
import {SearchAssignableUsersParams} from '~/schema/api/user';
import {BaseResponse} from '~/schema/common';

const SEARCH_ASSIGNABLE_USER_KEY = 'SEARCH_ASSIGNABLE_USER_KEY';

interface UseSearchAssignableUsersArgs extends SearchAssignableUsersParams {
  roomId: string;
  allowFetch?: boolean;
}

export const useSearchAssignableUsers = (
  args: UseSearchAssignableUsersArgs,
) => {
  const {roomId, page, pageSize, allowFetch = true, search} = args;
  const {data, ...rest} = useFetchInfinite(
    index =>
      allowFetch
        ? [index, page, pageSize, search, SEARCH_ASSIGNABLE_USER_KEY]
        : null,
    ([index, ..._]) =>
      API.FALL_SURVEILANCE.query({
        page: index + 1,
        pageSize: pageSize,
        exclude_permissions: Object.keys(ROOM_PERMISSIONS.ACCESS),
        search,
      })
        .get(API_PATH.HOUSE_SERVICES.SEARCH_ASSIGNABLE_USERS(roomId))
        .json<BaseResponse<User[]>>(r => r),
  );

  return {
    userCollections: data,
    ...rest,
  };
};
