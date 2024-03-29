import {API, API_PATH} from '~/constants/api';
import {useFetchInfinite} from '~/libs/hooks/useFetchInfinite';
import {HouseNotificationMeta, Notification} from '~/schema/api/notification';
import {GetHouseNotificationParams} from '~/schema/api/user';
import {BaseResponse} from '~/schema/common';

const GET_HOUSE_NOTIFICATION = 'GET_HOUSE_NOTIFICATION';

interface UseFetchHouseNotificationArgs extends GetHouseNotificationParams {}

export const useFetchHouseNotification = (
  args: UseFetchHouseNotificationArgs,
) => {
  const {page, pageSize, allowFetch = true, houseId} = args;
  const {data, ...rest} = useFetchInfinite(
    index =>
      allowFetch
        ? [index, page, pageSize, houseId, GET_HOUSE_NOTIFICATION]
        : null,
    ([index, ..._]) =>
      API.FALL_SURVEILANCE.query({
        page: index + 1,
        pageSize: pageSize,
      })
        .get(API_PATH.NOTIFICATION_SERVICES.HOUSE(houseId))
        .json<BaseResponse<Notification<HouseNotificationMeta>[]>>(r => r),
  );

  return {
    notificationsCollection: data,
    ...rest,
  };
};
