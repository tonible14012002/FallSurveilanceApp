import {useNavigation, useRoute} from '@react-navigation/native';
import {List, Text} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';
import {NotificationItem} from '~/components/common/NotificationItem';
import TimeAgo from '~/components/common/TimeAgo/TimeAgo';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PAGINATION} from '~/constants/common';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useFetchDeviceDetail} from '~/hooks/useFetchDeviceDetail';
import {useFetchDeviceNotification} from '~/hooks/useFetchDeviceNotification';
import {
  InviteMemberToRoomNotificationMeta,
  Notification,
  RoomNotificationMeta,
} from '~/schema/api/notification';
import {BaseResponse} from '~/schema/common';
import {ROOM_AVATAR, ROOM_NOTIFICATION_CODE} from './constants';

type RoomNotificationCodeType = keyof typeof ROOM_NOTIFICATION_CODE;

export const DeviceNotification = () => {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const route = useRoute();
  const {deviceId} = route.params as {deviceId: string};

  const {detail, isFirstLoading} = useFetchDeviceDetail(deviceId, !!deviceId);

  const {notificationsCollection} = useFetchDeviceNotification({
    deviceId,
    allowFetch: !!deviceId,
    page: 1,
    pageSize: PAGINATION.SMALL,
  });

  const __renderNotificationText = (
    eventCode: RoomNotificationCodeType,
    meta: RoomNotificationMeta,
  ) => {
    let title = '';
    let boldWords = [];

    if (eventCode === ROOM_NOTIFICATION_CODE.UPDATE_ROOM_METADATA) {
      title = 'The room updated some meta information';
    }
    if (eventCode === ROOM_NOTIFICATION_CODE.INVITE_MEMBER_TO_ROOM) {
      const members = (meta as InviteMemberToRoomNotificationMeta).new_members;
      boldWords.push(members[0].nickname);

      const membersLength = members.length;
      if (membersLength > 1) boldWords.push(`${membersLength - 1} others`);

      title += ' added to the room!';
    }

    return (
      <Text
        category="s2"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{maxWidth: 270}}>
        <Text style={{fontWeight: '800'}}>{boldWords[0]}</Text>
        {boldWords.length > 1 ? (
          <>
            <Text> and </Text>
            <Text style={{fontWeight: '800'}}>{boldWords[1]}</Text>
          </>
        ) : (
          ''
        )}
        {title}
      </Text>
    );
  };

  const __renderNotificationsCollection = ({
    item,
  }: {
    item: BaseResponse<Notification<RoomNotificationMeta>[]>;
  }) => {
    const {data} = item;
    return (
      <List
        key={item.pageable?.next_page}
        data={data}
        renderItem={({item: noti}) => {
          const avatar =
            noti.event_code === ROOM_NOTIFICATION_CODE.UPDATE_ROOM_METADATA
              ? ROOM_AVATAR
              : (noti.meta as InviteMemberToRoomNotificationMeta).new_members[0]
                  .avatar;

          return (
            <NotificationItem
              style={{marginBottom: 5}}
              isNotSeen={!noti.is_seen}
              title={__renderNotificationText(
                noti.event_code as RoomNotificationCodeType,
                noti.meta,
              )}
              subTitle={<TimeAgo date={noti.created_at} />}
              avatarUrl={avatar}
            />
          );
        }}
      />
    );
  };

  if (isFirstLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScreenLayout
      isScrollable
      hasPadding
      topBar={
        <TopBar
          onBack={() => navigate('DeviceDetail', {deviceId})}
          title={`${detail?.name} Notification`}
        />
      }>
      <TouchableOpacity style={{alignItems: 'flex-end'}}>
        <Text
          category="s2"
          status="primary"
          style={{textDecorationLine: 'underline'}}>
          Mark all as read
        </Text>
      </TouchableOpacity>
      <List
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: 'transparent', marginTop: 10}]}
        scrollEnabled
        data={notificationsCollection ?? []}
        renderItem={__renderNotificationsCollection}
      />
    </ScreenLayout>
  );
};
