import {useNavigation, useRoute} from '@react-navigation/native';
import {Avatar, Button, Text} from '@ui-kitten/components';
import {Pressable, View} from 'react-native';
import {ConfirmationModal} from '~/components/common/ConfimationModal';
import Icon from '~/components/core/Icon';
import ScreenLayout from '~/components/core/ScreenLayout';
import TopBar from '~/components/core/TopBar';
import UserList from '~/components/core/UserList';
import {PrivateScreenWithBottomBarProps} from '~/constants/routes';
import {useAuthContext} from '~/context/auth';
import {useDisclosure} from '~/hooks/common';
import {useFetchDeviceDetail} from '~/hooks/useFetchDeviceDetail';
import {boringAvatar} from '~/libs/utils';
import useDeviceUtils from './useDeviceUtils';
import {EditDeviceModal} from './EditDeviceModal';
import {mutate} from 'swr';
import {API_PATH} from '~/constants/api';

export default function DeviceDetailScreen() {
  const {navigate} = useNavigation<PrivateScreenWithBottomBarProps>();
  const route = useRoute();
  const {deviceId} = route.params as {deviceId: string};

  const {detail} = useFetchDeviceDetail(deviceId, Boolean(deviceId));

  const {id, image, ...spec} = detail?.specification ?? {};

  const handleNavigateRoomDetail = () =>
    navigate('RoomDetail', {roomId: detail?.room!});

  const {
    isOpenEditDeviceModal,
    isOpenConfirmationModal,
    onOpenEditDeviceModal,
    onOpenConfirmationModal,
    onCloseConfirmationModal,
    onCloseEditDeviceModal,
    isDeleteLoading,
    handleDeleteDevice,
  } = useDeviceUtils({
    deviceId,
    roomId: detail?.room!,
  });

  const onDelete = async () => {
    await handleDeleteDevice();
    onCloseConfirmationModal();
    mutate(API_PATH.HOUSE_SERVICES.HOUSE_DETAIL);
    handleNavigateRoomDetail();
  };

  const __renderHouseActionsBar = () => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 15,
      }}>
      <Button
        onPress={onOpenEditDeviceModal}
        style={{
          width: 45,
          height: 45,
          borderRadius: 45,
        }}
        status="warning"
        appearance="ghost">
        <Icon name="edit-outline" />
      </Button>
      <Button
        onPress={onOpenConfirmationModal}
        style={{
          width: 45,
          height: 45,
          borderRadius: 45,
        }}
        appearance="ghost">
        <Icon name="trash-outline" fill="red" />
      </Button>
    </View>
  );

  return (
    <>
      <ScreenLayout
        isScrollable
        hasPadding
        hasBottomBar
        topBar={
          <TopBar
            onBack={handleNavigateRoomDetail}
            title={
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <Text category="h6">Device Detail</Text>
              </View>
            }
          />
        }>
        <View>{__renderHouseActionsBar()}</View>
        <View style={{gap: 16}}>
          <View style={{gap: 8}}>
            <Text category="label">Name</Text>
            {detail?.name ? (
              <Text category="s2">{detail?.name}</Text>
            ) : (
              <Text category="s2" appearance="hint">
                - Empty
              </Text>
            )}
          </View>

          <View style={{gap: 8}}>
            <Text category="label">Specification</Text>
            {Object.entries(spec ?? {}).map(([key, value]) => (
              <View style={{flexDirection: 'row', gap: 10}}>
                <Text category="c2">{key}: </Text>
                <Text category="label">{value}</Text>
              </View>
            ))}
          </View>

          <UserList
            containerStyle={{marginBottom: 30}}
            listStyle={{gap: 10}}
            title={
              <Text category="label">
                Members •{' '}
                <Text category="c2" appearance="hint">
                  {detail?.related_users.length ?? 0} members
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
                onPress={() => {}}>
                <Icon name="chevron-right-outline" />
              </Button>
            }>
            {(detail?.related_users ?? []).map(mem => (
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
              onPress={() => {}}>
              <Icon name="plus" />
            </Button>
          </UserList>

          <ConfirmationModal
            title="Do you want to delete this device?"
            isLoading={isDeleteLoading}
            isOpen={isOpenConfirmationModal}
            onAccept={onDelete}
            onCancel={onCloseConfirmationModal}
          />

          <EditDeviceModal
            isOpen={isOpenEditDeviceModal}
            deviceId={deviceId}
            name={detail?.name ?? ''}
            roomId={detail?.room!}
            onClose={onCloseEditDeviceModal}
          />
        </View>
      </ScreenLayout>
    </>
  );
}
