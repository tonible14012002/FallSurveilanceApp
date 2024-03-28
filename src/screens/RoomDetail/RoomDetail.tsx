import {useNavigation} from '@react-navigation/native';
import {Avatar, Button, Text} from '@ui-kitten/components';
import {Pressable, View} from 'react-native';
import {DevicesList} from '~/components/HouseDetail';
import {RoomModal} from '~/components/HouseDetail/RoomModal';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {ItemsSelectModal} from '~/components/core';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {boringAvatar} from '~/libs/utils';
import useFetchRoomData from './useFetchRoomData';
import useModalsDisclosure from './useModalsDisclosure';

export default function RoomDetailScreen() {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {
    isOpenProfile,
    onCloseProfile,
    onOpenProfile,
    isOpenRoomsSelect,
    onCloseRoomsSelect,
    onOpenRoomsSelect,
    isOpenRoomEdit,
    onCloseRoomEdit,
    onToggleRoomEdit,
  } = useModalsDisclosure();

  const {user, roomId, roomDetail, rooms} = useFetchRoomData();

  const devices = roomDetail?.devices ?? [];

  const handleNavigateAddMembers = () => navigate('AddRoomMembers', {roomId});

  const handleNotificationInboxPressed = () => {
    if (!roomId) {
      return;
    }
    navigate('RoomNotification', {roomId});
  };

  const __renderTopBar = () => (
    <TopBar
      onBack={() => navigate('HouseDetail')}
      rightIcon={
        <ProfileDropdown
          onClose={onCloseProfile}
          isOpen={isOpenProfile}
          onOpen={onOpenProfile}
          trigger={
            <Avatar
              source={{
                uri: user?.avatar,
              }}
              loadingIndicatorSource={{
                uri: boringAvatar(user?.nickname),
              }}
            />
          }
        />
      }
      title={
        <Pressable
          onPress={onOpenRoomsSelect}
          style={({pressed}) => ({
            opacity: pressed ? 0.7 : 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          })}>
          <Text category="h6">{roomDetail?.name ?? ''}</Text>
          <Icon name="chevron-down-outline" />
        </Pressable>
      }
    />
  );

  const __renderRoomActionsBar = () => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 5,
      }}>
      <Button
        onPress={onToggleRoomEdit}
        style={{
          width: 45,
          height: 45,
          borderRadius: 45,
        }}
        appearance="ghost">
        <Icon name="edit-outline" />
      </Button>
      <Button
        onPress={handleNavigateAddMembers}
        style={{
          width: 45,
          height: 45,
          borderRadius: 45,
        }}
        appearance="ghost">
        <Icon name="person-add-outline" />
      </Button>
      <View style={{position: 'relative'}}>
        <Button
          onPress={handleNotificationInboxPressed}
          style={{
            width: 45,
            height: 45,
            borderRadius: 45,
          }}
          status="warning"
          appearance="ghost">
          <Icon name="bell-outline" />
        </Button>
        {/* DOT Indicator */}
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 10,
            height: 10,
            backgroundColor: 'red',
            borderRadius: 5,
          }}
        />
      </View>
    </View>
  );

  const __renderRoomDetails = () => (
    <View style={{gap: 16}}>
      <DevicesList devices={devices} roomId={roomId} />
      <View style={{gap: 8}}>
        <Text category="label">Description</Text>
        {roomDetail?.description ? (
          <Text category="s2">{roomDetail?.description}</Text>
        ) : (
          <Text category="s2" appearance="hint">
            - Empty
          </Text>
        )}
      </View>
      <UserList
        containerStyle={{marginBottom: 30}}
        listStyle={{gap: 10}}
        title={
          <Text category="label">
            Members •{' '}
            <Text category="c2" appearance="hint">
              {roomDetail?.members.length ?? 0} members
            </Text>
          </Text>
        }
        detailNavigator={
          <Button
            style={{
              borderRadius: 1000,
              width: 35,
              height: 35,
            }}
            appearance="ghost"
            onPress={() => {
              navigate('RoomMembers', {
                roomId: roomId as string,
                backScreenName: 'RoomDetail',
              });
            }}>
            <Icon name="chevron-right-outline" />
          </Button>
        }>
        {(roomDetail?.members ?? []).map(mem => (
          <Avatar
            key={mem.id}
            source={{
              uri: mem.avatar,
            }}
            style={{width: 50, height: 50}}
            loadingIndicatorSource={{
              uri: boringAvatar(mem.first_name),
            }}
          />
        ))}
        <Button
          style={{
            borderRadius: 1000,
            width: 50,
            height: 50,
          }}
          status="basic"
          onPress={handleNavigateAddMembers}>
          <Icon name="plus" />
        </Button>
      </UserList>
    </View>
  );

  const __renderRoomModals = () => (
    <>
      <ItemsSelectModal
        isOpen={isOpenRoomsSelect}
        onClose={onCloseRoomsSelect}
        items={rooms || []}
        renderItem={({item}) => (
          <ListItem
            onPressHandler={() => {
              navigate('RoomDetail', {roomId: item.id});
              onCloseRoomsSelect();
            }}
            title={item.name}
            subTitle={`${item.members.length} members`}
            rightEle={
              roomId === String(item.id) ? (
                <Icon size="small" name="checkmark-outline" />
              ) : null
            }
            level="1"
          />
        )}
      />
      <RoomModal
        houseId={roomDetail?.house.id ?? ''}
        isOpen={isOpenRoomEdit}
        onClose={onCloseRoomEdit}
        data={roomDetail}
      />
    </>
  );

  return (
    <>
      <ScreenLayout isScrollable hasPadding topBar={__renderTopBar()}>
        {__renderRoomActionsBar()}
        {__renderRoomDetails()}
        {__renderRoomModals()}
      </ScreenLayout>
    </>
  );
}
