import {useNavigation} from '@react-navigation/native';
import {Avatar, Button, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Pressable, View} from 'react-native';
import {RoomModal} from '~/components/HouseDetail/RoomModal';
import {AddMemberModal} from '~/components/common/AddMemberModal';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {UserPermissionsModal} from '~/components/common/UserPermissonsModal';
import {ItemsSelectModal} from '~/components/core';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {ROOM_PERMISSIONS} from '~/constants/common';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useDebounce} from '~/libs/hooks/useDebounce';
import {boringAvatar} from '~/libs/utils';
import useFetchRoomData from './useFetchRoomData';
import useModalsDisclosure from './useModalsDisclosure';

export default function RoomDetailScreen() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 400);

  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const {
    isOpenProfile,
    onCloseProfile,
    onOpenProfile,
    isOpenRoomsSelect,
    onCloseRoomsSelect,
    onOpenRoomsSelect,
    isOpenAddMember,
    onCloseAddMember,
    onToggleAddMember,
    isOpenRoomEdit,
    onCloseRoomEdit,
    onToggleRoomEdit,
    isOpenUserPermission,
    onCloseUserPermission,
    onToggleUserPermission,
  } = useModalsDisclosure();

  const {
    user,
    roomId,
    isLoadingUserCollections,
    userCollections,
    roomDetail,
    rooms,
  } = useFetchRoomData({
    isOpenAddMember,
    debouncedSearch,
  });

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
  );

  const __renderRoomDetails = () => (
    <>
      <View style={{marginBottom: 10, marginTop: 5}}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Description</Text>
        <Text category="s2">{roomDetail?.description}</Text>
      </View>
      <UserList
        containerStyle={{marginBottom: 30}}
        listStyle={{gap: 10}}
        title={
          <Text category="s2">
            Members •{' '}
            <Text category="c2">{roomDetail?.members.length ?? 0} members</Text>
          </Text>
        }
        detailNavigator={
          <Button
            style={{
              borderRadius: 1000,
              width: 35,
              height: 35,
            }}
            status="basic"
            onPress={onToggleUserPermission}>
            <Icon size="giant" name="chevron-right-outline" />
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
          onPress={onToggleAddMember}>
          <Icon name="plus" />
        </Button>
      </UserList>
    </>
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
      <AddMemberModal
        searchText={searchText}
        setSearchText={setSearchText}
        userCollections={userCollections ?? []}
        isLoading={isLoadingUserCollections}
        onSave={() => {}}
        isOpen={isOpenAddMember}
        onClose={onCloseAddMember}
      />
      <UserPermissionsModal
        permissions={ROOM_PERMISSIONS}
        isOpen={isOpenUserPermission}
        onClose={onCloseUserPermission}
      />
    </>
  );

  return (
    <>
      <ScreenLayout
        isScrollable
        hasPadding
        hasBottomBar
        topBar={__renderTopBar()}>
        {__renderRoomActionsBar()}
        {__renderRoomDetails()}
        {__renderRoomModals()}
      </ScreenLayout>
    </>
  );
}
