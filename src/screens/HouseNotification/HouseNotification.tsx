import {useNavigation, useRoute} from '@react-navigation/native';
import {List, Text} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';
import {NotificationItem} from '~/components/common/NotificationItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PAGINATION} from '~/constants/common';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useFetchHouseDetail} from '~/hooks/useFetchHouseDetail';
import {useFetchHouseNotification} from '~/hooks/useFetchHouseNotification';
import {
  AddMemberToHouseNotificationMeta,
  Notification,
  HouseNotificationMeta,
} from '~/schema/api/notification';
import {BaseResponse} from '~/schema/common';
import {HOUSE_AVATAR, HOUSE_NOTIFICATION_CODE} from './constants';
import TimeAgo from '~/components/common/TimeAgo/TimeAgo';

type HouseNotificationCodeType = keyof typeof HOUSE_NOTIFICATION_CODE;

export const HouseNotification = () => {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const route = useRoute();
  const {houseId} = route.params as {houseId: string};

  const {notificationsCollection} = useFetchHouseNotification({
    houseId,
    allowFetch: !!houseId,
    page: 1,
    pageSize: PAGINATION.SMALL,
  });

  const {detail, isFirstLoading} = useFetchHouseDetail(houseId, true);

  const __renderNotificationText = (
    eventCode: HouseNotificationCodeType,
    meta: HouseNotificationMeta,
  ) => {
    let title = '';
    let boldWords = [];

    if (eventCode === HOUSE_NOTIFICATION_CODE.UPDATE_HOUSE_METADATA) {
      title = 'The house updated some meta information';
    }
    if (eventCode === HOUSE_NOTIFICATION_CODE.ADD_MEMBER_TO_HOUSE) {
      const members = (meta as AddMemberToHouseNotificationMeta).member;
      boldWords.push(members[0].nickname);

      const membersLength = members.length;
      if (membersLength > 1) {
        boldWords.push(`${membersLength - 1} others`);
      }

      title += ' added to the house!';
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
    item: BaseResponse<Notification<HouseNotificationMeta>[]>;
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
        key={item.pageable?.next_page}
        style={{backgroundColor: 'transparent'}}
        data={data}
        renderItem={({item: noti}) => {
          const avatar =
            noti.event_code === HOUSE_NOTIFICATION_CODE.UPDATE_HOUSE_METADATA
              ? HOUSE_AVATAR
              : (noti.meta as AddMemberToHouseNotificationMeta).member[0]
                  .avatar;

          return (
            <NotificationItem
              style={{marginBottom: 5}}
              isNotSeen={!noti.is_seen}
              title={__renderNotificationText(
                noti.event_code as HouseNotificationCodeType,
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
          onBack={() => navigate('HouseDetail')}
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
        style={[{flex: 1, backgroundColor: 'transparent', marginTop: 10}]}
        scrollEnabled
        data={notificationsCollection ?? []}
        renderItem={__renderNotificationsCollection}
      />
    </ScreenLayout>
  );
};
