import {API, API_PATH} from '~/constants/api';
import {ROOM_PERMISSIONS} from '~/constants/permissions';
import {useFetchInfinite} from '~/libs/hooks/useFetchInfinite';
import {User} from '~/schema/api/identity';
import {SearchAssignableUsersParams} from '~/schema/api/user';
import {BaseResponse} from '~/schema/common';

const SEARCH_HOUSE_ASSIGNABLE_MEMBERS_KEY =
  'SEARCH_HOUSE_ASSIGNABLE_MEMBERS_KEY';

interface UseSearchAssignableUsersArgs extends SearchAssignableUsersParams {
  houseId: string;
  allowFetch?: boolean;
}

export const useSearchHouseAssignableMembers = (
  args: UseSearchAssignableUsersArgs,
) => {
  const {houseId, page, pageSize, allowFetch = true, search} = args;
  const {data, ...rest} = useFetchInfinite(
    index =>
      allowFetch
        ? [index, page, pageSize, search, SEARCH_HOUSE_ASSIGNABLE_MEMBERS_KEY]
        : null,
    ([index, ..._]) =>
      API.FALL_SURVEILANCE.query({
        page: index + 1,
        pageSize: pageSize,
        exclude_permissions: Object.keys(ROOM_PERMISSIONS.ACCESS),
        search,
      })
        .get(API_PATH.HOUSE_SERVICES.ASSIGNABLE_USERS(houseId))
        .json<BaseResponse<User[]>>(r => r),
  );

  return {
    userCollections: data,
    ...rest,
  };
};
