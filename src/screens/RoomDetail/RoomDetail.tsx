import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {Button, Text} from '@ui-kitten/components';
import {Avatar} from '~/components/core/v2/Avatar';
import {Pressable, View} from 'react-native';
import {mutate} from 'swr';
import {DevicesList} from '~/components/HouseDetail';
import {RoomModal} from '~/components/HouseDetail/RoomModal';
import {ConfirmationModal} from '~/components/common/ConfimationModal';
import {ProfileDropdown} from '~/components/common/ProfileDropdown';
import {ItemsSelectModal} from '~/components/core';
import Icon from '~/components/core/Icon';
import ListItem from '~/components/core/ListItem';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {API, API_PATH} from '~/constants/api';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {boringAvatar} from '~/libs/utils';
import {BaseResponse} from '~/schema/common';
import useFetchRoomData from './useFetchRoomData';
import useModalsDisclosure from './useModalsDisclosure';
import {getUserFullName} from '~/utils/user';
import {IconButton} from '~/components/core/IconButton';

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
    isOpenConfirmationModal,
    onOpenConfirmationModal,
    onCloseConfirmationModal,
  } = useModalsDisclosure();

  const {user, roomId, roomDetail, rooms} = useFetchRoomData();

  const theme = useTheme();
  const devices = roomDetail?.devices ?? [];

  const handleNavigateAddMembers = () => navigate('AddRoomMembers', {roomId});

  const handleNotificationInboxPressed = () => {
    if (!roomId) {
      return;
    }
    navigate('RoomNotification', {roomId});
  };

  const onDelete = async () => {
    try {
      await API.FALL_SURVEILANCE.delete(
        API_PATH.HOUSE_SERVICES.DELETE_ROOM(roomDetail?.house.id!, roomId),
      ).json<BaseResponse<any>>(r => r);
      navigate('HouseDetail');
      mutate(API_PATH.HOUSE_SERVICES.HOUSE_DETAIL);
    } catch (error) {
      console.log(error);
    }
    onCloseConfirmationModal();
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
              label={getUserFullName(user)}
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
        gap: 16,
      }}>
      <IconButton
        icon={<Icon size="medium" name="trash-outline" />}
        onPress={onOpenConfirmationModal}
        width={42}
        height={42}
        style={{
          backgroundColor: theme['color-basic-200'],
        }}
      />
      <IconButton
        icon={<Icon size="medium" name="edit-outline" />}
        onPress={onToggleRoomEdit}
        width={42}
        height={42}
        style={{
          backgroundColor: theme['color-basic-200'],
        }}
      />

      <IconButton
        icon={<Icon size="medium" name="person-add-outline" />}
        onPress={handleNavigateAddMembers}
        width={42}
        height={42}
        style={{
          backgroundColor: theme['color-basic-200'],
        }}
      />

      <View style={{position: 'relative'}}>
        <IconButton
          onPress={handleNotificationInboxPressed}
          icon={<Icon size="medium" name="bell-outline" />}
          width={42}
          height={42}
          style={{
            backgroundColor: theme['color-basic-200'],
          }}
        />
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
      <DevicesList
        devices={devices}
        roomId={roomId}
        roomName={roomDetail?.name ?? ''}
      />
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
            label={getUserFullName(user)}
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

      <ConfirmationModal
        title="Do you want to delete this room?"
        isLoading={false}
        isOpen={isOpenConfirmationModal}
        onAccept={onDelete}
        onCancel={onCloseConfirmationModal}
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
