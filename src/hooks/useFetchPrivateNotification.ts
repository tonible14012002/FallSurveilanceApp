import {API, API_PATH} from '~/constants/api';
import {useFetchInfinite} from '~/libs/hooks/useFetchInfinite';
import {
  HouseNotificationMeta,
  Notification,
  PrivateNotificationMeta,
} from '~/schema/api/notification';
import {GetPrivateNotificationParams} from '~/schema/api/user';
import {BaseResponse} from '~/schema/common';

const GET_PRIVATE_NOTIFICATION = 'GET_PRIVATE_NOTIFICATION';

interface UseFetchPrivateNotificationArgs
  extends GetPrivateNotificationParams {}

export const useFetchPrivateNotification = (
  args: UseFetchPrivateNotificationArgs,
) => {
  const {page, pageSize, allowFetch = true} = args;
  const {data, ...rest} = useFetchInfinite(
    index =>
      allowFetch ? [index, page, pageSize, GET_PRIVATE_NOTIFICATION] : null,
    ([index, ..._]) =>
      API.FALL_SURVEILANCE.query({
        page: index + 1,
        pageSize: pageSize,
      })
        .get(API_PATH.NOTIFICATION_SERVICES.PRIVATE)
        .json<BaseResponse<Notification<PrivateNotificationMeta>[]>>(r => r),
  );

  return {
    notificationsCollection: data,
    ...rest,
  };
};
