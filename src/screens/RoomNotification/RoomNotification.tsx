import {useNavigation, useRoute} from '@react-navigation/native';
import {Text} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';
import {NotificationItem} from '~/components/common/NotificationItem';
import List from '~/components/core/List';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useFetchRoomDetail} from '~/hooks/useFetchRoomDetail';

export const RoomNotification = () => {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const route = useRoute();
  const {roomId} = route.params as {roomId: string};

  const {detail, isFirstLoading} = useFetchRoomDetail(roomId, true);
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
        scrollable
        listStyle={{
          paddingBottom: 50,
          gap: 4,
        }}>
        <NotificationItem
          isNotSeen
          title={
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{maxWidth: 265}}>
              <Text style={{fontWeight: '800'}}>Khoa Truong</Text> added you to
              his house
            </Text>
          }
          subTitle={
            <Text category="p2" style={{color: 'gray'}}>
              20 minutes ago
            </Text>
          }
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI__yjUO07TXv6pLC3g-B5Z5hixZjITUTrJKEs0CmkHA&s"
        />
        <NotificationItem
          title={
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{maxWidth: 265}}>
              <Text style={{fontWeight: '800'}}>Khoa Truong</Text> added you to
              his house
            </Text>
          }
          subTitle={
            <Text category="p2" style={{color: 'gray'}}>
              20 minutes ago
            </Text>
          }
          avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI__yjUO07TXv6pLC3g-B5Z5hixZjITUTrJKEs0CmkHA&s"
        />
      </List>
    </ScreenLayout>
  );
};
