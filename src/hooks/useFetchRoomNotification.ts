import {API, API_PATH} from '~/constants/api';
import {useFetchInfinite} from '~/libs/hooks/useFetchInfinite';
import {Notification, RoomNotificationMeta} from '~/schema/api/notification';
import {GetRoomNotificationParams} from '~/schema/api/user';
import {BaseResponse} from '~/schema/common';

const GET_ROOM_NOTIFICATION = 'GET_ROOM_NOTIFICATION';

interface UseFetchRoomNotificationArgs extends GetRoomNotificationParams {}

export const useFetchRoomNotification = (
  args: UseFetchRoomNotificationArgs,
) => {
  const {page, pageSize, allowFetch = true, roomId} = args;
  const {data, ...rest} = useFetchInfinite(
    index =>
      allowFetch
        ? [index, page, pageSize, roomId, GET_ROOM_NOTIFICATION]
        : null,
    ([index, ..._]) =>
      API.FALL_SURVEILANCE.query({
        page: index + 1,
        pageSize: pageSize,
      })
        .get(API_PATH.NOTIFICATION_SERVICES.ROOM(roomId))
        .json<BaseResponse<Notification<RoomNotificationMeta>[]>>(r => r),
  );

  return {
    notificationsCollection: data,
    ...rest,
  };
};
