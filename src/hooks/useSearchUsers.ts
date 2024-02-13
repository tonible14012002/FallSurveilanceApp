import {API, API_PATH} from '~/constants/api';
import {useFetchInfinite} from '~/libs/hooks/useFetchInfinite';
import {User} from '~/schema/api/identity';
import {SearchUserProfileParams} from '~/schema/api/user';
import {BaseResponse} from '~/schema/common';

const SEARCH_USER_KEY = 'SEARCH_USER_KEY';

interface UseSearchUsersArgs extends SearchUserProfileParams {
  allowFetch?: boolean;
}

export const useSearchUsers = (args: UseSearchUsersArgs) => {
  const {page, pageSize, allowFetch = true, search} = args;
  const {data, ...rest} = useFetchInfinite(
    index =>
      allowFetch ? [index, page, pageSize, search, SEARCH_USER_KEY] : null,
    ([index, ..._]) =>
      API.FALL_SURVEILANCE.query({
        page: index + 1,
        pageSize: pageSize,
        search,
      })
        .get(API_PATH.USER_SERVICES.SEARCH_USERS)
        .json<BaseResponse<User[]>>(r => r),
  );
  return {
    userCollections: data,
    ...rest,
  };
};
