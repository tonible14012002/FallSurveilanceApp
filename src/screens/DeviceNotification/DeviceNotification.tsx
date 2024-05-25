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
import {Notification, DeviceNotificationMeta} from '~/schema/api/notification';
import {BaseResponse} from '~/schema/common';
import {DEVICE_NOTIFICATION_CODE} from './constants';
import {POPUPS, usePopupContext} from '~/context/popup';
import Icon from '~/components/core/Icon';
import {formatDate} from 'date-fns';

type DeviceNotificationCodeType = keyof typeof DEVICE_NOTIFICATION_CODE;

export const DeviceNotification = () => {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const route = useRoute();
  const {deviceId} = route.params as {deviceId: string};

  const {detail, isFirstLoading} = useFetchDeviceDetail(deviceId, !!deviceId);
  const {showPopup} = usePopupContext();

  const {notificationsCollection} = useFetchDeviceNotification({
    deviceId,
    allowFetch: !!deviceId,
    page: 1,
    pageSize: PAGINATION.SMALL,
  });

  const __renderNotificationText = (
    eventCode: DeviceNotificationCodeType,
    _: DeviceNotificationMeta,
  ) => {
    let title = '';

    if (eventCode === DEVICE_NOTIFICATION_CODE.FALL_DETECTED) {
      title = 'Human fall detected';
    }

    return (
      <Text
        category="s2"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{maxWidth: 270}}>
        <Text style={{fontWeight: '800'}}>{title}</Text>
      </Text>
    );
  };

  const __renderNotificationsCollection = ({
    item,
  }: {
    item: BaseResponse<Notification<DeviceNotificationMeta>[]>;
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
        key={'device-noti-' + item.pageable?.next_page}
        data={data}
        scrollEnabled={false}
        style={{backgroundColor: 'transparent'}}
        renderItem={({item: noti}) => {
          return (
            <NotificationItem
              isNotSeen={!noti.is_seen}
              title={__renderNotificationText(
                noti.event_code as DeviceNotificationCodeType,
                noti.meta,
              )}
              subTitle={<TimeAgo date={noti.created_at} />}
              avatarUrl={noti.meta.image}
              onPress={() =>
                showPopup(POPUPS.FALL_DETECTED, {
                  icon: <Icon size="superGiant" name="alert-circle-outline" />,
                  title: 'Fall detected',
                  description: `Fall detected at ${formatDate(
                    noti.created_at,
                    'dd/MM/yyyy HH:MM',
                  )}`,
                  image: noti.meta.image,
                })
              }
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
      isScrollable={false}
      hasPadding
      topBar={
        <TopBar
          onBack={() => navigate('DeviceDetail', {deviceId})}
          title={`${detail?.name} Notification`}
        />
      }>
      <TouchableOpacity style={{alignItems: 'flex-end'}}>
        <Text category="s2" status="primary">
          Mark all as read
        </Text>
      </TouchableOpacity>
      <List
        showsVerticalScrollIndicator={false}
        style={[{flex: 1, backgroundColor: 'transparent', marginTop: 16}]}
        scrollEnabled
        data={notificationsCollection ?? []}
        renderItem={__renderNotificationsCollection}
      />
    </ScreenLayout>
  );
};
