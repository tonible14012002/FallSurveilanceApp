import {API, API_PATH} from '~/constants/api';
import {useFetchInfinite} from '~/libs/hooks/useFetchInfinite';
import {
  DeviceNotificationMeta,
  Notification,
  RoomNotificationMeta,
} from '~/schema/api/notification';
import {GetDeviceNotificationParams} from '~/schema/api/user';
import {BaseResponse} from '~/schema/common';

const GET_DEVICE_NOTIFICATION = 'GET_DEVICE_NOTIFICATION';

interface UseFetchDeviceNotificationArgs extends GetDeviceNotificationParams {}

export const useFetchDeviceNotification = (
  args: UseFetchDeviceNotificationArgs,
) => {
  const {page, pageSize, allowFetch = true, deviceId} = args;
  const {data, ...rest} = useFetchInfinite(
    index =>
      allowFetch
        ? [index, page, pageSize, deviceId, GET_DEVICE_NOTIFICATION]
        : null,
    ([index, ..._]) =>
      API.FALL_SURVEILANCE.query({
        page: index + 1,
        pageSize: pageSize,
      })
        .get(API_PATH.NOTIFICATION_SERVICES.DEVICE(deviceId))
        .json<BaseResponse<Notification<DeviceNotificationMeta>[]>>(r => r),
    {
      refreshInterval: 5000,
    },
  );

  return {
    notificationsCollection: data,
    ...rest,
  };
};
