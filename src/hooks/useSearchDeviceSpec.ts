import {API, API_PATH} from '~/constants/api';
import {useFetchInfinite} from '~/libs/hooks/useFetchInfinite';
import {DeviceSpecification} from '~/schema/api/house';
import {SearchAssignableUsersParams} from '~/schema/api/user';
import {BaseResponse} from '~/schema/common';

const SEARCH_DEVICE_SPEC = 'SEARCH_DEVICE_SPEC';

interface UseSearchDeviceSpecArgs extends SearchAssignableUsersParams {
  allowFetch?: boolean;
}

export const useSearchDeviceSpec = (args: UseSearchDeviceSpecArgs) => {
  const {page, pageSize, allowFetch = true, search} = args;
  const {data, ...rest} = useFetchInfinite(
    index =>
      allowFetch ? [index, page, pageSize, search, SEARCH_DEVICE_SPEC] : null,
    ([index, ..._]) =>
      API.FALL_SURVEILANCE.query({
        page: index + 1,
        pageSize: pageSize,
        search,
      })
        .get(API_PATH.DEVICE_SERVICES.SPECIFICATIONS)
        .json<BaseResponse<DeviceSpecification[]>>(r => r),
  );

  return {
    deviceSpecCollections: data,
    ...rest,
  };
};
