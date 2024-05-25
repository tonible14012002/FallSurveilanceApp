import {List, Text} from '@ui-kitten/components';
import {Avatar} from '~/components/core/v2/Avatar';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {NotificationItem} from '~/components/common/NotificationItem';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PAGINATION} from '~/constants/common';
import {useAuthContext} from '~/context/auth';
import {useDisclosure} from '~/hooks/common';
import {useFetchPrivateNotification} from '~/hooks/useFetchPrivateNotification';
import {
  InviteToHouseNotificationMeta,
  InviteToRoomNotificationMeta,
  Notification,
  PrivateFallDetectedNotificationMeta,
  PrivateNotificationMeta,
} from '~/schema/api/notification';
import {BaseResponse} from '~/schema/common';
import {PRIVATE_NOTIFICATION_CODE} from './constants';
import TimeAgo from '~/components/common/TimeAgo/TimeAgo';
import {getUserFullName} from '~/utils/user';
import {useNavigation} from '@react-navigation/native';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';

type PrivateNotificationCodeType = keyof typeof PRIVATE_NOTIFICATION_CODE;

export default function PrivateNotification() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user} = useAuthContext();
  const navigation = useNavigation<PrivateScreenWithBottomBarProps>();

  const {notificationsCollection} = useFetchPrivateNotification({
    allowFetch: !!user,
    page: 1,
    pageSize: PAGINATION.SMALL,
  });

  const __renderNotificationText = (
    eventCode: PrivateNotificationCodeType,
    meta: PrivateNotificationMeta,
  ) => {
    let title = '';
    let boldWords = [];
    if (
      eventCode === PRIVATE_NOTIFICATION_CODE.NOTIFY_USER_DEVICE_FALL_DETECTED
    ) {
      meta = meta as PrivateFallDetectedNotificationMeta;
      boldWords.push(meta.device.name);
      title += ' detected a human fall';
    }

    if (eventCode === PRIVATE_NOTIFICATION_CODE.INVITED_TO_HOUSE) {
      const invitor = (meta as InviteToHouseNotificationMeta).invitor;
      boldWords.push(invitor.nickname);

      title += ' added you to house ';

      const house = (meta as InviteToHouseNotificationMeta).house;
      boldWords.push(house.name);
    }
    if (eventCode === PRIVATE_NOTIFICATION_CODE.INVITED_TO_ROOM) {
      const invitor = (meta as InviteToRoomNotificationMeta).invitor;
      boldWords.push(invitor.nickname);

      title += ' added you to room ';
      const room = (meta as InviteToRoomNotificationMeta).room;
      boldWords.push(room.name);
    }

    return (
      <Text
        category="s2"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{maxWidth: 270}}>
        <Text style={{fontWeight: '800'}}>{boldWords[0]}</Text>
        {title}
        <Text style={{fontWeight: '800'}}>{boldWords[1]}</Text>
      </Text>
    );
  };

  const __renderNotificationsCollection = ({
    item,
  }: {
    item: BaseResponse<Notification<PrivateNotificationMeta>[]>;
  }) => {
    const {data} = item;

    if (!data.length) {
      return (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No notifications found!
        </Text>
      );
    }

    return (
      <List
        scrollEnabled={false}
        key={item.pageable?.next_page}
        style={{backgroundColor: 'transparent'}}
        data={data}
        renderItem={({item: noti}) => {
          const avatar = (noti.meta as any)?.invitor?.avatar ?? '';
          return (
            <NotificationItem
              onPress={() => {
                if (
                  noti.event_code ===
                  PRIVATE_NOTIFICATION_CODE.NOTIFY_USER_DEVICE_FALL_DETECTED
                ) {
                  navigation.navigate('DeviceDetail', {
                    deviceId: (noti.meta as PrivateFallDetectedNotificationMeta)
                      .device.id,
                  });
                }
              }}
              danger={
                noti.event_code ===
                PRIVATE_NOTIFICATION_CODE.NOTIFY_USER_DEVICE_FALL_DETECTED
              }
              style={{marginBottom: 8}}
              isNotSeen={!noti.is_seen}
              title={__renderNotificationText(
                noti.event_code as PrivateNotificationCodeType,
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

  return (
    <ScreenLayout
      isScrollable={false}
      hasPadding
      topBar={
        <TopBar
          title="Notification"
          rightIcon={
            <>
              <Pressable style={{paddingHorizontal: 4}}>
                <Text category="s1" status="primary">
                  Filter
                </Text>
              </Pressable>
              <ProfileDropdown
                onClose={onClose}
                isOpen={isOpen}
                onOpen={onOpen}
                trigger={
                  <Avatar
                    label={getUserFullName(user)}
                    source={{
                      uri: user?.avatar,
                    }}
                  />
                }
              />
            </>
          }
        />
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 16,
        }}>
        <View style={{flex: 1}} />
        <TouchableOpacity>
          <Text category="s2">Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <List
        showsVerticalScrollIndicator={false}
        style={[
          {
            flex: 1,
            backgroundColor: 'transparent',
          },
        ]}
        scrollEnabled
        data={notificationsCollection ?? []}
        renderItem={__renderNotificationsCollection}
      />
    </ScreenLayout>
  );
}
