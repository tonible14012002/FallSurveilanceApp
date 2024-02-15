import {useNavigation, useRoute} from '@react-navigation/native';
import {Avatar, Button, Text} from '@ui-kitten/components';
import {Pressable, View} from 'react-native';
import {useHouseDetailContext} from '~/components/HouseDetail';
import {RoomModal} from '~/components/HouseDetail/RoomModal';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {ItemsSelectModal} from '~/components/core';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {useDisclosure} from '~/hooks/common';
import {useFetchHouseRooms} from '~/hooks/useFetchHouseRooms';
import {useFetchRoomDetail} from '~/hooks/useFetchRoomDetail';
import {boringAvatar} from '~/libs/utils';
import AddMemberModal from './AddMemberModal';

export default function RoomDetailScreen() {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {user} = useAuthContext();
  const {houseId} = useHouseDetailContext();
  const {
    isOpen: isOpenProfile,
    onClose: onCloseProfile,
    onOpen: onOpenProfile,
  } = useDisclosure();
  const {
    isOpen: isOpenRoomsSelect,
    onClose: onCloseRoomsSelect,
    onOpen: onOpenRoomsSelect,
  } = useDisclosure();
  const {
    isOpen: isOpenAddMember,
    onClose: onCloseAddMember,
    onToggle: onToggleAddMember,
  } = useDisclosure();
  const {
    isOpen: isOpenRoomEdit,
    onClose: onCloseRoomEdit,
    onToggle: onToggleRoomEdit,
  } = useDisclosure();

  const route = useRoute();
  const {roomId} = route.params as {roomId: string};

  const {detail} = useFetchRoomDetail(roomId, Boolean(roomId));
  const {rooms} = useFetchHouseRooms(houseId, Boolean(houseId));
  const members = detail?.members ?? []; //members here

  return (
    <>
      <ScreenLayout
        isScrollable
        hasPadding
        hasBottomBar
        topBar={
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
                <Text category="h6">{detail?.name ?? ''}</Text>
                <Icon name="chevron-down-outline" />
              </Pressable>
            }
          />
        }>
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
            status="warning">
            <Icon name="edit-outline" />
          </Button>
          <Button
            onPress={onToggleAddMember}
            style={{
              width: 45,
              height: 45,
              borderRadius: 45,
            }}
            status="danger">
            <Icon name="person-add-outline" />
          </Button>
        </View>
        <View style={{marginBottom: 10, marginTop: 5}}>
          <Text style={{fontWeight: 'bold', marginBottom: 5}}>Description</Text>
          <Text category="s2">{detail?.description}</Text>
        </View>
        <UserList
          containerStyle={{marginBottom: 30}}
          listStyle={{gap: 10}}
          title={
            <Text category="s2">
              Members •{' '}
              <Text category="c2">{detail?.members.length ?? 0} members</Text>
            </Text>
          }
          detailNavigator={
            <Button
              style={{
                borderRadius: 1000,
                width: 35,
                height: 35,
              }}
              status="control">
              <Icon size="giant" name="chevron-right-outline" />
            </Button>
          }>
          {members.map(mem => (
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
            status="basic">
            <Icon name="plus" />
          </Button>
        </UserList>
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
          houseId={detail?.house.id ?? ''}
          isOpen={isOpenRoomEdit}
          onClose={onCloseRoomEdit}
          data={detail}
        />
        <AddMemberModal
          roomId={roomId}
          isOpen={isOpenAddMember}
          onClose={onCloseAddMember}
        />
      </ScreenLayout>
    </>
  );
}
