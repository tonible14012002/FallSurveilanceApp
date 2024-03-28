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
import {HouseNotificationCode} from './constants';

type HouseNotificationCodeType = keyof typeof HouseNotificationCode;

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

    if (eventCode === 'UPDATE_HOUSE_METADATA') {
      title = 'The house updated some meta information';
    }
    if (eventCode === 'ADD_MEMBER_TO_HOUSE') {
      const members = (meta as AddMemberToHouseNotificationMeta).member;
      boldWords.push(members[0].nickname);

      const membersLength = members.length;
      if (membersLength > 1) boldWords.push(`${membersLength - 1} others`);

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
    return (
      <List
        key={item.pageable?.next_page}
        data={data}
        renderItem={({item: noti}) => {
          return (
            <NotificationItem
              style={{marginBottom: 5}}
              isNotSeen={!noti.is_seen}
              title={__renderNotificationText(
                noti.event_code as HouseNotificationCodeType,
                noti.meta,
              )}
              subTitle={
                <Text category="p2" style={{color: 'gray'}}>
                  20 minutes ago
                </Text>
              }
              avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI__yjUO07TXv6pLC3g-B5Z5hixZjITUTrJKEs0CmkHA&s"
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